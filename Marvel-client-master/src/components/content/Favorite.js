import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../axios";
import EachMovie from '../content/EachMovie';
// import EachTVshow from '../content/EachTVshow';
import { Alert } from 'reactstrap';
class Favorite extends Component {

    state = {
        word: "List Favor",
        size: "8rem",
        movieContents:[{}]
	};
    
    componentDidMount() {
        axios
            .get(`/api/listfavor/${sessionStorage.getItem('username')}`)
        .then(data=> {
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

    // handleResize = (event) => {
    //     // console.log(window.innerHeight, window.innerWidth);
    //     if(window.innerWidth<700){
    //         this.setState({
    //             size: "4rem",
    //         })
    //     }else{
    //         this.setState({
    //            size:"8rem"
    //         })
    //     }

    //     if(window.innerWidth<500){
    //         this.setState({
    //             size: "2rem"
    //         })
    //     }else{
    //         this.setState({
    //            word:"MOVIES"
    //         })
    //     }
    // }

    render() {
        // var checkid = this.state.movieContents[0].id/10000 ;
        // console.log(checkid);

        // const moveLink = thi

        const allMovie =  this.state.movieContents[0]
        ?
            this.state.movieContents.map(content => (
                // const path = "movies"
                //  content.id ? 
                <div key={content._id} className="col-md-4" > 
                    <Link to = {`/movies/${content.id}`} className="elementlink">
                    {/* <Link to = {`  /${(6<10) ? `tvshows` : `movies`}/${content.id}`} className="elementlink"> */}
                        <EachMovie detail={content}  />
                    </Link>
                </div>
                ))
            // this.state.movieContents.map(content => (
            //     // const path = ""
            //     //  content.id ? 
            //     <div key={content._id} className="col-md-4" > 
            //         {}
            //         <Link to = {`  /${(6<10) ? `tvshows` : `movies`}/${content.id}`} className="elementlink">
            //             <EachMovie detail={content}  />
            //         </Link>
            //     </div>
            //     ))
        :
        <div style={{margin: "auto", width: "50"}}>
            <Alert color="info">
                <h3 className="alert-heading text-center">Hmm!</h3>
                <p>
                    Your favor list is empty!
                </p>
                <hr />
                <div className="mb-0 text-center">
                    <Link to = {"/"} >Homepage </Link>
                </div>
            </Alert>
        </div>;
        // const allMovie = this.state.movieContents.map(content => (
        //     <div key={content._id} className="col-md-4"> 
        //         <Link to = {`/movies/${content.id}`} className="elementlink">
        //             <EachMovie detail={content}  />
        //         </Link>
        //     </div>
        // ));

        const display = this.props.onLogin() ? (
            <div className="card-group mt-3 mb-3">
                {allMovie}
            </div>
        ) : (
            <div className="alert" style={{width: "40%",margin: "auto"}}>
                <Alert color="info">
                    <h4 className="alert-heading text-center">Login action needed!</h4>
                    <p className="text-center">
                        Please Login to see your Favorite list!
                    </p>
                    <hr />
                    <div className="mb-0 text-center">
                        <Link to = {"/Login"} >Login </Link> or create new free account,
                        <Link to = {"/Signup"} > Sign Up</Link>
                    </div>
                </Alert>
            </div>
        );
        return (
            <div className="container">
                {display}
            </div>
        );
    }
}

export default Favorite;