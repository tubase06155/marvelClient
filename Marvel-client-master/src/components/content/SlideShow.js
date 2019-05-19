import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';

import img_1 from '../../img/anh/Spider-Man-Far-From-Home-Teaser-Poster.jpg';
import img_2 from '../../img/anh/a2.jpg';
import img_3 from '../../img/anh/venom1.jpg';
// import img_1 from '../../img/Spider-Man-Far-From-Home-Teaser-Poster.jpg';
// import img_2 from '../../img/avenger1.jpg';
// import img_3 from '../../img/venom1.jpg';

const items = [
    {
        src: img_1,
        altText: 'Spider Man Far From Home',    //show when can't load img
        caption: '2019',
        header: 'Spider Man Far From Home'
    },
    {
        src:img_2,
        altText: 'avenger infi war',
        caption: '2018',
        header: 'Avenger: Infinity War'
    },
    {
        src: img_3,
        altText: 'venom',
        caption: 'In Theater Now!',
        header: 'Venom'
    }
];

class SlideShow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({
            activeIndex: nextIndex
        });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({
            activeIndex: nextIndex
        });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({
            activeIndex: newIndex
        });
    }

    render() {
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img src={item.src} alt={item.altText} />
                    <CarouselCaption captionText={item.caption} captionHeader={item.header} />
                </CarouselItem>
            );
        });

        return (
            <div className="">
                <Carousel
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                >
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
            </div>
        );
    }
}

export default SlideShow;