import React, { Component } from 'react';

import { Link } from 'react-router-dom';
class Content extends Component {
    render() {
        return (
        <div className="container mt-mb-5">
            <h2><span>The Lastest </span><span className="hightlight">Movie</span></h2>
            <div className="card-deck mt-mb-5">
                {/* cho thẻ Link vào trong class card là hình bé lại như cũ */}
                <Link to = {`/movies/299536`} className="elementlink">
                    <div className="card mt-mb-3 shadows">
                        <img className="card-img-top shadows" src={require("../../img/a2.jpg")} alt="Cú lừa"/>
                        <div className="card-body">
                            <h5 className="card-title">Avenger : Infinity War</h5>

                            <p className="card-text"><small className="text-muted">2018</small></p>
                        </div>
                    </div>
                </Link>
                <div className="card mt-mb-3 shadows">
                    <Link to = {`/movies/335983`} className="elementlink">
                        <img className="card-img-top shadows" src={require("../../img/venom1.jpg")} alt="Cú lừa"/>
                        <div className="card-body">
                            <h5 className="card-title">Venom</h5>
                            <p className="card-text"><small className="text-muted">In theater now</small></p>
                        </div>
                    </Link>
                </div>
                
                <div className="card mt-mb-3 shadows">
                    <Link to = {`/movies/299537`} className="elementlink">
                        <img className="card-img-top shadows" src={require("../../img/capmavel.jpg")} alt="Cú lừa"/>
                        <div className="card-body">
                            <h5 className="card-title">Captain Marvel</h5>
                            <p className="card-text"><small className="text-muted">2019</small></p>
                        </div>
                    </Link>
                </div>
            </div>


                <span className="float-sm-right mt-3">
                    <Link to={`/movies`} className="showMore">Show More>></Link>
                </span>
                <br/>
            <hr className="mt-5" width="50%" size="5px" color="white" />
            <h2><span className="hightlight">TV </span><span>Show</span></h2>
            <div className="card-deck mt-3 mb-3 shadows">
                <div className="card mt-mb-3">
                    {/* <img className="card-img-top" src={`https://s2-ssl.dmcdn.net/c34DF/x1080-IGK.jpg`} alt="IronFist2"/> */}
                    {/* <img className="card-img-top" src={`http://images6.fanpop.com/image/photos/41500000/Iron-Fist-Season-2-Key-Art-iron-fist-netflix-41520415-500-191.jpg`} alt="CapMarvel"/> */}
                    <div className="card-img-top embed-responsive embed-responsive-16by9">
                        <iframe className="embed-responsive-item" title="Iron Fist 2" src="https://www.youtube.com/embed/kvvWB0GwCek?autoplay=1&mute=1" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">Marvel's Iron Fist (Season 2)  <small className="text-muted">- Trailer only!</small></h3>
                        <p className="card-text"><small className="text-muted">2018-9-7</small></p>
                    </div>
                </div>
            </div>
            {/* <div className="card-deck mt-3 mb-3">
                <div className="card">
                </div>
            </div>
            <div className="card-deck mt-3 mb-3">
                <div className="card">
                </div>
            </div> */}
            <div>
                <span className="float-sm-right mb-mt-3"><Link to={`/tvshows`} className="showMore">Show More >></Link></span>
                <br/>
            </div>
            <hr className="mt-3" width="50%" size="5px" color="white" />
        </div>
        );
    }
}

export default Content;