import React, { Component } from 'react';
import { Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
// import { Link } from "react-router-dom";
// import SearchResult from './content/SearchResult';
import axios from "../axios";
// import { Route } from 'react-router-dom';
class SearchField extends Component {

    state={
        text:"",
        movieContents:[{}]
    }


    _handleTextChange = event => {
        this.props.onSearchChanged(event.target.value);
    }

    handleInputChange = (event) => {
        this.setState({text: event.target.value});
        console.log("text :" + this.state.text);
      }

    onSubmit = (e) =>{
        e.preventDefault();
        axios
            .get(`/api/movies/search/${this.state.text}`)
            .then(data => {
                this.setState({ 
                    movieContents: data.data,
                    text:""
                });
            })
            .catch(err =>
                console.error(err));
        
        this.props.history.push(`/search/${this.state.text.toLowerCase()}`);
    }

    render() {
        return (
            <div>
                <form className="fa-search" onSubmit={this.onSubmit} >
                    <Input type="text" value={this.state.text}  onChange={this.handleInputChange} name="keyword" className="form-control" id="inputEmail4" placeholder="search movie"/>
                </form>
            </div>
        );
    }
}

export default withRouter(SearchField);