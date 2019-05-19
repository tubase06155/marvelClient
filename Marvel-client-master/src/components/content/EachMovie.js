import React, { Component } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
class MovieContent extends Component {

    render() {
        return (
            <div className="card mt-3 mb-3 shadows">
                <img className="card-img-top shadows " src={this.props.detail.posterUrl} alt={this.props.title}/>
                <div className="card-body">
                    {/* <FontAwesomeIcon className="love" icon={faHeart}/> */}
                    <h5 className="card-title">{this.props.detail.name ?this.props.detail.name :this.props.detail.title}</h5>
                    <p className="card-text"><small className="text-muted">{this.props.detail.release_date}</small></p>
                </div>
            </div> 
        );
    }
}

export default MovieContent;