import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchField from './SearchField'
import ProfilePanel from './ProfilePanel'
import logo from '../img/A.png'

class NavBar extends Component { 
    

    render() {
        return (
            <div> 
                <nav className="navbar navbar-expand-lg topNav">
                    <div className="container ">
                        <div className="col-6 col-sm-1 col-md-3 col-lg-3">
                            <ProfilePanel username = {this.props.username} onLogin={this.props.isAuthenticated}/>
                        </div>
                        <div className="col-6 col-sm-11 col-md-6 col-lg-6 text-center" >
                            <Link to={"/"}>
                                <img src={logo} alt="logo" className="logo" />
                            </Link>
                        </div>
                        <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                            <SearchField onSearchChanged = {this.props.onSearchChanged}  />
                        </div>
                        {/* <div className="col-3">
                            <ProfilePanel username = {this.props.username} onLogin={this.props.isAuthenticated}/>
                        </div>
                        <div className="col-6 text-center" >
                            <Link to={"/"}>
                                <img src={logo} alt="logo" className="logo" />
                            </Link>
                        </div>
                        <div className="col-3">
                            <SearchField onSearchChanged = {this.props.onSearchChanged}  />
                        </div> */}
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavBar;