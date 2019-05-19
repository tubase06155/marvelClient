import React, { Component } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import Login from "./form/Login"
import { Link } from 'react-router-dom';
import axios from '../axios';
import config from '../config';

class ProfilePanel extends Component {


    onSignOut=()=>{
        sessionStorage.clear();
        axios({
            method: 'delete',
            url: `${config.rootPath}/api/auth`,
            
            withCredentials:true
            
          })
          .then(response=>{
            console.log("status:  "+response.data) 
            
            // this.props.history.push("/");      
          })
          .catch (err=>{
              console.log(err+" loi roi ");
           });
    }

    render() {
        // const display = !this.props.username ? (
        const display = this.props.onLogin() ? (
            <div>
                <span className = "navbar-text image-inner">{sessionStorage.getItem("username")},&nbsp;&nbsp;</span> 
                <Link to = {"/"} className = "btn btn-primary" onClick={this.onSignOut}>
                    Sign Out 
                </Link> 
                
            </div>
        ) : (
            <Link to = {"/Login"} className = "btn btn-primary btn-facebook">
                Login
            </Link> 
        );
        return (
            <div className=" profile_panel text-left">
                {display}
            </div>
        );
    }
}

export default ProfilePanel;