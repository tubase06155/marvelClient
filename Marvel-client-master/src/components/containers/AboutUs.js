import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
class AboutUs extends Component {
    render() {
        return (
            <div className=" container text-center">
                <div className="alert alert-success" role="alert">
                <h2 className="alert-heading text-left ml-5">About Us!</h2>
                <hr/>
                <h4 className="mt-5"><strong>Aww yeah, We are Marvel's fan Dev Team</strong>  <img style={{width:"25px",height:"25px"}} src={require("../../img/possible.png")} alt="Cú lừa"/></h4>
                
                <h5>a small Team with a BIG dream, Working with enthusiastic and talended teammates</h5>
                <p className="mt-5 mb-0">This Project have taken us hundreds of hours of works!</p>
                <FontAwesomeIcon icon={faHeart}/>   Thanks for your support! We appreciate it!

                <hr/>
                <p className="mb-0"># Marvelfan FILM <strong>PROJECT</strong> </p>
                </div>
            </div>
        );
    }
}

export default AboutUs;