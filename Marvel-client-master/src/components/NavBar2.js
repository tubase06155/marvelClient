import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class NavBar2 extends Component {
    render() {
        // const user = ``;
        // const movePage = (page) =>{
        //     page.preventDefault();
        //     // <Redirect to={`/Movies`}/>
        //     console.log('The link was clicked.');
        // };

        return (
            <nav className="navbar navbar-expand-lg navbar-dark menubar">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav nav mr-auto menubarList">
                        <li className="nav-item avtive listItem">
                            <Link to={`/movies`} className="nav-link ">MOVIE</Link>
                        </li>
                        <li className="nav-item avtive listItem">
                            <Link to={`/tvshows`} className="nav-link ">TV SERIES</Link>
                        </li>
                        <li className="nav-item avtive listItem">
                            <Link to={`/news`} className="nav-link ">NEWS</Link>
                        </li>
                        <li className="nav-item avtive listItem">
                            {/* <Link to={`/favorite`} className="nav-link link">FAVORITE</Link> */}
                            <Link to={`/favorite`} className="nav-link ">FAVORITE</Link>
                        </li>
                        <li className="nav-item avtive listItem">
                            <Link to={`/about`} className="nav-link ">ABOUT US</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavBar2;