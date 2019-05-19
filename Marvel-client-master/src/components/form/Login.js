import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from "../../config"
import { Form, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import axios from "../../axios"
class Login extends Component { 
state={
  username:"",
  password:"",
  loginFalse:""
}

handleInputChange = (event) => {
  const { value, name } = event.target;
  this.setState({[name]: value});
}

handlerOnSubmit=(event)=>{
  event.preventDefault();
  axios({
      method: 'post',
      url: `${config.rootPath}/api/auth`,
      data: {
        username: this.state.username,
        password: this.state.password
      }
      ,
      withCredentials:true
      
    })
    .then(response=>{
        console.log(response) 
      // sessionStorage.setItem('status','loggedIn') ;
      // sessionStorage.setItem('id', response.data._id);
      // sessionStorage.setItem('username', response.data.username);
      sessionStorage.setItem('status','loggedIn') ;
      sessionStorage.setItem('id', response.data._id);
      sessionStorage.setItem('username', response.data.username);

      this.props.history.push("/");      
    })
    .catch (err=>{
        console.log(err)
        if(err.response.status===400){
          this.setState({loginFalse:true});
                        
        }
      // if  ( err.response && err.response.status===402) {
      //     this.setState({passWrong:true,nameWrong:false});
      // }
      //      else this.setState({nameWrong:true})
     });
}

  //   handleInputChange = (event) => {
  //   if(event.target.name=="username"){
  //     this.setState.username=event.target.value;
  //   }else{
  //     this.setState.password=event.target.value;
  //   }
  // }


    render() {
        return (
          
            <div className="container"> 
                
                <Form onSubmit={this.handlerOnSubmit} className="login">
                    <h1>Log In</h1>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Username</label>
                        <Input type="text" value={this.state.username}  onChange={this.handleInputChange} name="username" className="form-control" id="inputEmail4" placeholder="Username" required/>
                      </div>
                      
                    </div>

                    <div className="form-row">

                      <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Password</label>
                        <Input type="password" value={this.state.password} onChange={this.handleInputChange} name="password" className="form-control" id="inputPassword4" placeholder="Password" required/>
                      </div>
                    </div>
                    {this.state.loginFalse? <p className="hightlight">Wrong Username or Password</p> : ""}
                    <button type="submit" className="btn btn-primary mr-5">Sign in</button>
                          or if you don't have an account <Link to="/SignUp" className="btn btn-primary ml-2"> Sign Up </Link>
                    
                  </Form>
                  
            </div>
        );
    }
}

export default withRouter(Login);