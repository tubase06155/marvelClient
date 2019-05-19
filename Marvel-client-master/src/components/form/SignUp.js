import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import config from "../../config"
import { Form, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import axios from "../../axios"
class SignUp extends Component { 
  state = {
    username:"",
    password:"",
    name:"",
    role:"",
    signUpFalse:""
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({[name]: value});
  }

  handlerOnSubmit=(event)=>{
    event.preventDefault();
    axios({
        method: 'post',
        url: `${config.rootPath}/api/users/`,
        data: {
          username: this.state.username,
          password: this.state.password,
          name:this.state.name,
          role:"1"
        }
        ,
        withCredentials:true
        
      })
      .then(response=>{
          console.log(response) 
          if(response.status===200){
            axios({
              method: 'post',
              url: `api/listfavor/create`,
              data: {
                  username:sessionStorage.getItem('username'),
                  "listfv":{Id:``
                  ,name:``}
              },
              withCredentials:true
              }).then(data =>{
                  console.log("create list success: "+data);
              }).catch(err =>{
                  console.log(err+" fail to create list (lừa đấy)")
              });
          }
        this.props.history.push("/Login");      
      })
      .catch (err=>{
          console.log(err)
          if(err.response){
          if(err.response.status===500){
            this.setState({signUpFalse:true});
          }}
       });
  }
    render() {
        return ( 
          
            <div className="container"> 
                
                <Form className="login" onSubmit={this.handlerOnSubmit}> 
                    <h1>Sign Up</h1>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Username</label>
                        <Input type="text" value={this.state.username}  onChange={this.handleInputChange} name="username" autoComplete="username" className="form-control"  placeholder="Username" required/>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Password</label>
                        <Input type="password" value={this.state.password} onChange={this.handleInputChange} name="password" autoComplete="new-password" className="form-control"  placeholder="Password" required/>
                      </div>
                    </div>
                    <div className="form-row">

                      <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Name</label>
                        <Input type="text" value={this.state.name} onChange={this.handleInputChange} name="name" className="form-control"  placeholder=" " required/>
                      </div>
                    </div>
                    {this.state.signUpFalse? <p className="hightlight">This username is already exist!</p> : ""}

                    {/* <div className="form-row">
                    
                      <div className="form-group col-md-2">
                        <label htmlFor="inputState">Gender</label>
                        <select id="inputState" className="form-control">
                          <option selected>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    
                    </div> */}
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </Form>
            </div>
        );
    }
}

export default withRouter (SignUp);