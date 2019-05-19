import React, { Component } from 'react';
import axios from "../../axios";
import EachMovie from '../content/EachMovie';
import { Link } from "react-router-dom";
import { Alert } from 'reactstrap';  
class SearchResult extends Component {
    state = {
        movieContents:[{}]
    }
    
    componentWillMount = () => {
        let value = window.location.pathname.substring(8);
        console.log(value);
        axios
            .get(`/api/movies/search/${value}`)
            .then(data => {
                this.setState({ 
                    movieContents: data.data
                });
            })
            .catch(err =>
                console.error(err));
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.location.pathname);
        let value = nextProps.location.pathname.substring(8);
        console.log(value);
        axios
            .get(`/api/movies/search/${value}`)
            .then(data => {
                this.setState({ 
                    movieContents: data.data
                });
            })
            .catch(err =>
                console.error(err));
      }

    render() {
        // let allMovie;
        // console.log("data: "+this.state.movieContents[0].name)
        const allMovie =  this.state.movieContents.mess ? 
        <div style={{margin: "auto", width: "50"}}>
                    <Alert color="info">
                        <h3 className="alert-heading text-center">Hmm!</h3>
                        <p>
                            Sorry! We found nothing with your search key word!
                        </p>
                        <hr />
                        <div className="mb-0 text-center">
                            <Link to = {"/"} >Homepage </Link>
                        </div>
                    </Alert>
        </div>
        :
        this.state.movieContents.map(content => (
            <div key={content._id} className="col-md-4"> 
                <Link to = {`/movies/${content.moviesId}`} className="elementlink">
                    <EachMovie detail={content}  />
                </Link>
            </div>
        ));

        return (
            <div>
                <div className="container " style={{position:"relative",backgroundColor:"#3c4043"}}>
                    <div className="card-group mt-3 mb-3">
                        {allMovie}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchResult;