import React, { Component } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
class AllTVshow extends Component {
    render() {
        return (
            <div className="card mt-3 mb-3 shadows">
                {(this.props.detail.posterUrl)!==("https://image.tmdb.org/t/p/w500null")
                    ?<img className="card-img-top shadows" src={this.props.detail.posterUrl} alt={this.props.title}/>
                    :<img className="card-img-top shadows" src={'https://media1.tenor.com/images/4691e4eb1ba57dc4ee6e9078976b7f65/tenor.gif?itemid=11252157'} alt="Cú lừa ok?"/>
                    // :<img className="card-img-top" src={culua} alt="Cú lừa ok?"/>
                }
                
                <div className="card-body">
                    {/* <FontAwesomeIcon className="love" icon={faHeart}/>  */}
                    <h5 className="card-title">{this.props.detail.title}</h5>
                    <p className="card-text"><small className="text-muted">Rates: <b className="text-danger">{this.props.detail.vote_average}</b></small></p>
                </div>
            </div>
        );
    }
}

export default AllTVshow;
