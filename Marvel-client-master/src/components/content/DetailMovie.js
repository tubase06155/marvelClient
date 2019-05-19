import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom'
// import { Alert } from 'reactstrap';
// import config from '../../config';
// import { Link } from "react-router-dom";
import axios from "../../axios";
class DetailMovie extends Component {

    state = {
        movieDetail:[{}],
        showHeight: "50vh",
        colhalfWidth: "100%",
        btnLoveMT : "3vh",
        h1Font: "4rem",
        word: "Favorite",
        fa: faHeart,
        isclick: "off",
        message:""
	}
      
    componentDidMount(){
        axios
            .get(`/api/movies/${this.props.match.params.moviesId}`)
            .then(data => {
                this.setState({ 
                    movieDetail: data.data[0]
                });
            })
            .catch(err => console.error(err));
        window.addEventListener('resize', this.handleResize);
        // console.log(window.innerHeight, window.innerWidth);
        console.log("url : "+window.location.href);
}

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleChangeFa = (event) => {
        if(this.state.isclick === "off"){
            this.setState({
                isclick: "on",
                fa: faTrash,
                word: "Delete"
            })
            return false;
        }else {
            this.setState({
                isclick: "off",
                fa: faHeart,
                word: "Favorite"
            })
            // return true;
        }
    }

    handleResize = (event) => {
        // console.log(window.innerHeight, window.innerWidth);
        if(window.innerWidth>900){
            this.setState({
                showHeight:"50vh",
                colhalfWidth:"100%",
                btnLoveMT:"3vh"
            })
        }
        else if(window.innerWidth<500){
            this.setState({
                showHeight:"100%",
                colhalfWidth:"50%",
                btnLoveMT:"0",
                h1Font : "2rem"

            })
        }else{
            this.setState({
                btnLoveMT:"0",
                colhalfWidth:"50%",
                h1Font:"3rem",
                showHeight:"100%"
            })
        }
    }

    addFavor = () =>{
        axios({
            method: 'put',
            url: `api/listfavor/add`,
            data: {
                username:sessionStorage.getItem('username'),
                "ob":{Id:`movie/${this.props.match.params.moviesId}`
                ,name:`${this.state.movieDetail.name}`}
            },
            withCredentials:true
            
          }).then(data =>{
            // this.handleChangeFa;

            // this.setState({isclick:"off"})
            this.setState({
                message:"Success!"
            })
            console.log(data);
        }).catch(err =>{
            console.log(err+" loi addFV")
            if(err.response.status===401){
                this.props.history.push("/Login"); 
            }
            if(err.response.status===500){
                axios({
                    method: 'post',
                    url: `api/listfavor/create`,
                    data: {
                        username:sessionStorage.getItem('username'),
                        "listfv":{Id:`movie/${this.props.match.params.moviesId}`
                        ,name:`${this.state.movieDetail.name}`}
                    },
                    withCredentials:true
                }).then(data =>{
                    console.log(data);
                }).catch(err =>{
                    console.log(err+" fail to create list")
                });
            }
        });
        // <Alert color="info">
        //     <h3 className="alert-heading text-center">Success!</h3>
        //     <p>
        //         Add your favor list! 
        //     </p>
        //     <hr />
        //     {/* <div className="mb-0 text-center">
        //         <Link to = {"/"} >Homepage </Link>
        //     </div> */}
        // </Alert>
    }

    deleteFavor = () =>{
        axios({
            method: 'put',
            url: `api/listfavor/dele`,
            data: {
                username:sessionStorage.getItem('username'),
                Id:`movie/${this.props.match.params.moviesId}`
            },
            withCredentials:true
            
          }).then(data =>{
            // this.handleChangeFa;

            // this.setState({isclick:"off"})

            console.log(data);
        }).catch(err =>{
            console.log(err+" loi delete")
        });
    }

    render() {
        const checkMess = this.state.message === "Success!" ?
            <div class="alert alert-success alert-dismissible fade show text-center" style={{width:"100%"}} role="alert">
                {this.state.message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        :<div></div>

        const showFavButton = this.state.word ==="Favorite" ? 
        <div>
            <button onClick={this.addFavor} className="btn btn-love"  style={{marginTop: this.state.btnLoveMT}}>
                <FontAwesomeIcon icon={this.state.fa}/> {this.state.word}
            </button>
            {checkMess}
        </div>:
        <div>
            <button onClick={this.deleteFavor} className="btn btn-love"  style={{marginTop: this.state.btnLoveMT}}>
                <FontAwesomeIcon icon={this.state.fa}/> {this.state.word}
            </button>
        </div>

        return (
            <div>
                <div className="show" style={{height: this.state.showHeight}}>
                    <div className="filmDetail ">
                    <img src={this.state.movieDetail.backdrop_path} alt=""></img>
                    </div>
                    <div className="favor" >
                        <h1 style={{fontSize:this.state.h1Font}}>{this.state.movieDetail.name}</h1>
                        <h4>Release Date: {this.state.movieDetail.release_date}</h4>
                        <br />
                        <div className="row">
                            <div className="col-half" style={{width: this.state.colhalfWidth}}>
                                {/* <button className="btn btn-facebook">
                                    <FontAwesomeIcon icon={['fab', 'facebook']}/> Share</button> */}
                                    <div className="fb-share-button" data-href={`https://marvelfan.herokuapp.com/movies/${this.props.match.params.moviesId}`} data-layout="button" data-size="large" data-mobile-iframe="true">
                                        <a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmarvelfan.herokuapp.com%2Fmovies%2F${this.props.match.params.moviesId}&amp;src=sdkpreparse`} className="fb-xfbml-parse-ignore">Share</a>
                                        {/* <Link to={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmarvelfan.herokuapp.com%2Fmovies%2F${this.props.match.params.moviesId}&amp;src=sdkpreparse`} target="_blank" rel="noopener noreferrer" className="fb-xfbml-parse-ignore">Share</Link> */}
                                    </div>
                            </div>    
                            <div className="col-half" style={{width: this.state.colhalfWidth}}>

                                {/* <button className="btn btn-love" onClick={this.addFavor}  style={{marginTop: this.state.btnLoveMT}}>
                                    <FontAwesomeIcon icon={faHeart}/> Favorite</button> */}
                                    {/* this.handleChangeFa===true?this.addFavor:"" */}
                                {/* <button onClick={this.addFavor} className="btn btn-love"  style={{marginTop: this.state.btnLoveMT}}>
                                <FontAwesomeIcon icon={this.state.fa}/> {this.state.word}</button> */}
                                {showFavButton}
                            </div>    
                        </div>
                    </div>
                </div>
                <div className="container mt-3 trailer">
                    <h2><span></span><span className="hightlight">Trailer</span></h2>
                    <div className="card-img-top embed-responsive embed-responsive-16by9">
                        <iframe className="embed-responsive-item" title={this.state.movieDetail.name} src={`https://www.youtube.com/embed/${this.state.movieDetail.imdb_id}?autoplay=1&mute=1`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    </div>
                </div>
                <div className="container mt-5 mb-5 image-inner">
                    <div className="row justify-content-start">
                        <div className="col-sm-12 col-lg-4">
                            <img className="poster" src={this.state.movieDetail.posterUrl}
                                // srcset="https://image.tmdb.org/t/p/w300_and_h450_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg 1x, https://image.tmdb.org/t/p/w600_and_h900_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg 2x"
                                alt={this.state.movieDetail.name}/>
                        </div>
                        <div className="col-sm-12 col-lg-8 content">
                            <h1><span className="hightlight">{this.state.movieDetail.name}</span></h1>
                            <h2>Over view</h2>
                            <span>{this.state.movieDetail.overview}</span>
                            <br/>
                            <h2 className="mt-3">Information</h2>
                            <div>
                                <ul className="infor">
                                    <li className="inforRow">
                                        <div className="inforLabel">Director By:</div>
                                        <div className="inforValue">Anthony Russo, Joe Russo</div>
                                    </li>
                                    <li className="inforRow">
                                        <div className="inforLabel">Written By:</div>
                                        <div className="inforValue">Christopher Markus, Stephen McFeely</div>
                                    </li>
                                    <li className="inforRow">
                                        <div className="inforLabel">Rating:</div>
                                        <div className="inforValue">PG-13</div>
                                    </li>
                                    <li className="inforRow">
                                        <div className="inforLabel">Runtime:</div>
                                        <div className="inforValue">120 minutes</div>
                                    </li>
                                    <li className="inforRow">
                                        <div className="inforLabel">Release Date:</div>
                                        <div className="inforValue">{this.state.movieDetail.release_date}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="container mt-3" >
                    <h2><span></span><span className="hightlight">Link FullHD vietsub! </span></h2>
                </div>  
                <div className="container mt-mb-3" >
                   
                </div>   */}
                <div className=" container text-center mb-5" style={{width:"50%"}}>
                    <div className="alert alert-success" role="alert">
                    <h2 className="alert-heading text-center">Link FullHD vietsub!</h2>
                    <button className="btn btn-success mt-4" >
                    <FontAwesomeIcon style={{color:"#d4edda"}} icon={faHeart}/>    
                    <a target="_blank" className="elementlink" style={{color: "#fff"}} without rel="noopener noreferrer" href={`http://lmgtfy.com/?q=${this.state.movieDetail.name}+full+hd+vietsub`}>  Just click it!</a>
                    </button>
                    <hr/>
                    <p className="mb-0"># <strong>Movie</strong> </p>
                    </div>
                </div>
            </div>    
        );
    }
}

export default withRouter(DetailMovie);