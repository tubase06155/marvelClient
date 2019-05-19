import React, { Component } from 'react';
import axios from "../../axios";
import EachTVshow from '../content/EachTVshow';
import { Link } from "react-router-dom";  

class AllTVshows extends Component {
    state = {
        word: "TV SERIES",
        size: "8rem",
        tvContent:[{}]
	}

    componentDidMount(){
        axios
            .get(`/api/tv`)
            .then(data => {
                this.setState({ 
                    tvContent: data.data
                });
            })
            .catch(err => console.error(err));
            window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize = (event) => {
        if(window.innerWidth<700){
            this.setState({
                size: "4rem",
            })
        }else{
            this.setState({
               size:"8rem"
            })
        }

        if(window.innerWidth<500){
            this.setState({
                size: "2rem"
            })
        }else{
            this.setState({
                word:"TV SERIES"
            })
        }
    }

    render() {
        const allTVshow = this.state.tvContent.map(content=>(
            <div key={content._id} className="col-md-4"> 
                <Link to = {`/tvshows/${content.id}`} className="elementlink">
                    <EachTVshow detail={content}  />
                </Link>
            </div>
        ));
        return (
            <div>
                <div style={{position: "absolute", top: "23%", left: "0", width:"100%",  zIndex: "2"}} >
                    <h1 style={{fontSize:this.state.size,color: "white",textAlign:"center"}}>{this.state.word}</h1>
                </div>
                <img style={{width:"100%",zIndex:"10",marginTop:"-40px"}} src="https://terrigen-cdn-dev.marvel.com/content/prod//2x/thegifteds2-com_mas_dsk_01.jpg" alt="Cú lừa"/>
                
                <div className="container" style={{position:"relative",marginTop: "-80px",backgroundColor:"#3c4043"}}>
                    <div className="card-group mt-3 mb-3">
                        {allTVshow}
                    </div>
                </div>
            </div>
        );
    }
}

export default AllTVshows;