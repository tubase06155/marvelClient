import React, { Component } from 'react';
import axios from "../../axios";
import EachMovie from '../content/EachMovie';
// import DetailMovie from "../content/DetailMovie";
import { Link } from "react-router-dom";  

class AllMovies extends Component {
    state = {
        word: "MOVIES",
        size: "8rem",
        movieContents:[{}],
        searchString:""
	}
      
    componentDidMount(){
        axios
            .get(`/api/movies/`)
            .then(data => {
                this.setState({ 
                    movieContents: data.data
                });
            })
            .catch(err => console.error(err));
            window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize = (event) => {
        // console.log(window.innerHeight, window.innerWidth);
        if(window.innerWidth<700){
            this.setState({
                size: "4rem",
            })
        }else{
            this.setState({
               size:"8rem"
            })
        }

        if(window.innerWidth<500){
            this.setState({
                size: "2rem"
            })
        }else{
            this.setState({
               word:"MOVIES"
            })
        }
    }

    render() {
        const allMovie = this.state.movieContents.map(content => (
            <div key={content._id} className="col-md-4"> 
                <Link to = {`/movies/${content.moviesId}`} className="elementlink">
                    <EachMovie detail={content}  />
                </Link>
            </div>
        ));
        
        return (
            <div>
                <div style={{position: "absolute", top: "23%", left: "0", width:"100%",  zIndex: "2"}} >
                    <h1 style={{fontSize:this.state.size,color: "white",textAlign:"center"}}>{this.state.word}</h1>
                </div>
                <img style={{width:"100%",zIndex:"10",marginTop:"-40px"}} src="https://terrigen-cdn-dev.marvel.com/content/prod/2x/daredevils3-com_mas_dsk_01.jpg" alt="Cú lừa"/>
                
                <div className="container " style={{position:"relative",marginTop: "-80px",backgroundColor:"#3c4043"}}>
                    <div className="card-group mt-3 mb-3">
                        {allMovie}
                    </div>
                </div>
            </div>  
        );
    }
}

export default AllMovies;