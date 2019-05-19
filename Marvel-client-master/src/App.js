import React, { Component } from 'react';
import NavBar from './components/NavBar';
import NavBar2 from './components/NavBar2';
import SlideShow from './components/content/SlideShow';
// import SlideShowTest from './components/SlideShow(False)';
import HomeContent from './components/content/HomeContent';
// import MovieContent from './components/content/MovieContent';
import AllMovies from "./components/containers/AllMovies";
import AllTVshows from "./components/containers/AllTVshows";
import DetailMovie from "./components/content/DetailMovie";
import DetailTVshow from "./components/content/DetailTVshow";
import AllNews from "./components/containers/AllNews";
import AboutUs from "./components/containers/AboutUs";
// import axios from './axios';
import Login from './components/form/Login';
import SignUp from './components/form/SignUp';
import Favorite from './components/content/Favorite';
import SearchResult from './components/content/SearchResult';
import Footer from './components/Footer';
import { BrowserRouter, Route } from 'react-router-dom';
// import axios from "./axios";
import ScrollToTop from 'react-router-scroll-top'

//css, bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/button.css';
import './css/style.css';
import './css/slideshow.css';
//Import and Create Libs for fontAwesome (a icon library)

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
// import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// import { faCheckSquare, faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons';
library.add(fab );


//==============================
//        Patch 1.4 Caution!
// Chưa có check if gọi database bị false
// Bố cục card chưa chặt chẽ (grid)
//==============================

class App extends Component {

  state = {
    username:"",
    searchString:""
  };

  
  changeAuthenticated=()=>{
   
    const token= sessionStorage.getItem("status");

    // if(!token){
    //   console.log("eo co session")
    // }else{
    //   console.log("abc vcl : "+token);
    // }
    // console.log("user: "+ this.state.username)

    if(!token ) return false;
    else return true;
  }

  onSearchChanged = text =>{
    this.setState({ searchString: text });
    // axios
    //   .get(`/api/movies/search/Marvel`)
    //   .then(data => {
    //       this.setState({ 
    //           movieContents: data.data
    //       });
    //       this.state.history.push("/search");
    //   })
    //   .catch(err => console.error(err));
  } 

  
  // componentDidUpdate(){
    // this.setState({username:sessionStorage.getItem("username")});
  // };

  // _onLogin = (username,password) => {   
  //   axios
  //     .post("/api/auth",{
  //       username: username,
  //       password: password
  //     })
  //     .then(response => 
  //       this.setState({
  //         username: response.data.username
  //       })
  //     )
  //     .catch(err => console.error(err));   
  // };
  
  // componentDidCatch(){
    // document.body.scrollTop = 0;
    
    // lấy dữ liệu từ server
  // }

  render() {
    let text = this.state.searchString;
    return (
      <BrowserRouter>
        <ScrollToTop>
          <div className="App">
            <header className="App-header sticky-top">
            <Route path="/" render={props =>{
              return <NavBar {...props} username={this.state.username} isAuthenticated={this.changeAuthenticated} onSearchChanged={this.onSearchChanged}/>
            }}>
            </Route>
            <NavBar2/>
            </header>
            <Route exact path="/Login" render={props =>{
              return <Login isAuthenticated={this.changeAuthenticated}/>
            }}>
            </Route>
            <Route exact path="/SignUp" render={props =>{
              return <SignUp/>
            }}>
            </Route>
            <div className="middleP">
              <div className="slideshow">
                <Route exact path="/" component={SlideShow} />
              </div>
              <div className="homecontent">
                <Route exact path="/" component={HomeContent} />
              </div>
              <Route exact path="/movies" component={AllMovies} />
              <Route exact path="/tvshows" component={AllTVshows} />
              <Route exact path="/news" render={props=>{
                return <div>
                  <SlideShow/>
                  <AllNews/>
                </div>
              }} />
              <Route exact path="/about" component={AboutUs} />
              <Route exact path="/search/:value" render={props=>{
                return <SearchResult {...props} onSearchChanged={this.onSearchChanged} text ={text} />
              }}/>

              <Route exact path={`/favorite`} render={props=>{
                return <Favorite {...props} onLogin={this.changeAuthenticated}/>
              }} />
              <Route path="/movies/:moviesId" render={(props)=>{
                  return <DetailMovie {...props}  />
              }} />
              <Route path="/tvshows/:tvshowId" render={(props)=>{
                  return <DetailTVshow {...props}  />
              }} />
            </div>
            <Footer/>
          </div>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

export default App;
