import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faTrash } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom'
// import config from '../../config';
import axios from "../../axios";

class DetailTVshow extends Component {

    state = {
        tvshowDetail:[{}],
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
            .get(`/api/tv/${this.props.match.params.tvshowId}`)
            .then(data => {
                this.setState({ 
                    tvshowDetail: data.data
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

    addFavor = () =>{
        axios({
            method: 'put',
            url: `api/listfavor/add`,
            data: {
                username:sessionStorage.getItem('username'),
                "ob":{Id:`tv/${this.props.match.params.tvshowId}`
                ,name:`${this.state.tvshowDetail.name}`}
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
                        "listfv":{Id:`tv/${this.props.match.params.moviesId}`
                        ,name:`${this.state.tvshowDetail.name}`}
                    },
                    withCredentials:true
                }).then(data =>{
                    console.log(data);
                }).catch(err =>{
                    console.log(err+" fail to create list")
                });
            }
        });
    }

    deleteFavor = () =>{
        axios({
            method: 'put',
            url: `api/listfavor/dele`,
            data: {
                username:sessionStorage.getItem('username'),
                Id:`tv/${this.props.match.params.moviesId}`
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
                    <div className="filmDetail">
                    <img src={this.state.tvshowDetail.backdrop_path} alt=""></img>
                    </div>
                    <div className="favor">
                        <h1 style={{fontSize:this.state.h1Font}}>{this.state.tvshowDetail.title}</h1>
                        {/* <h2>{this.state.tvshowDetail.release_date}</h2> */}
                        <br /><br /><br />
                        <div className="row">
                            <div className="col-half" style={{width: this.state.colhalfWidth}}>
                                {/* <button className="btn btn-facebook">
                                    <FontAwesomeIcon icon={['fab', 'facebook']}/> Share</button> */}
                                <div className="fb-share-button" data-href={`https://marvelfan.herokuapp.com/tvshows/${this.props.match.params.tvshowId}`} data-layout="button" data-size="large" data-mobile-iframe="true">
                                    <a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fmarvelfan.herokuapp.com%2Ftvshows%2F${this.props.match.params.tvshowId}&amp;src=sdkpreparse`} className="fb-xfbml-parse-ignore">Share</a>
                                </div>
                            </div>
                            <div className="col-half" style={{width: this.state.colhalfWidth}}>
                                {/* <button className="btn btn-love" style={{marginTop: this.state.btnLoveMT}}>
                                    <FontAwesomeIcon icon={faHeart}/> Favorite</button> */}
                                    {showFavButton}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-3 trailer">
                    {/* <h2><span></span><span className="hightlight">Trailer</span></h2> */}
                        <div className="card-img-top embed-responsive embed-responsive-16by9">
                            {/* <iframe src={"https://www.youtube.com/embed/QwievZ1Tx-8?autoplay=1"} frameborder="0" title="abc" allow="autoplay; encrypted-media"></iframe> */}
                        </div>
                </div>
                <div className="container mt-5 mb-5 image-inner">
                    <div className="row justify-content-start">
                        <div className="col-sm-12 col-lg-4">
                            <img className="poster" src={this.state.tvshowDetail.posterUrl}
                                // src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg 1x, https://image.tmdb.org/t/p/w600_and_h900_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg 2x"
                                alt={this.state.tvshowDetail.title}/>
                        </div>
                        <div className="col-sm-12 col-lg-8 content">
                            <h1><span className="hightlight">{this.state.tvshowDetail.title}</span></h1>
                            <h2>Over view</h2>
                            <span>{this.state.tvshowDetail.overview}</span>
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
                                        <div className="inforValue">60 minutes / Episode</div>
                                    </li>
                                    <li className="inforRow">
                                        <div className="inforLabel">Homepage:</div>
                                        <div className="inforValue">
                                            <a href = {this.state.tvshowDetail.homepage} className="elementlink">
                                                {this.state.tvshowDetail.homepage}
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>  
                <div className=" container text-center mb-5" style={{width:"50%"}}>
                    <div className="alert alert-success" role="alert">
                    <h2 className="alert-heading text-center">Link FullHD vietsub!</h2>
                    <button className="btn btn-success mt-4" >
                    <FontAwesomeIcon style={{color:"#d4edda"}} icon={faHeart}/>    
                    <a target="_blank" className="elementlink" style={{color: "#fff"}} without rel="noopener noreferrer" href={`http://lmgtfy.com/?q=${this.state.tvshowDetail.title}+full+hd+vietsub`}>  Just click it!</a>
                    </button>
                    <hr/>
                    <p className="mb-0"># <strong>TV Series</strong> </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(DetailTVshow);