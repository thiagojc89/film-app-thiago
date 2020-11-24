import React, { Component } from 'react';
import './App.css';
import FilmDetails from './FilmDetails.js';
import FilmListing from './FilmListing.js';
import TMDB from './TMDB.js';
import axios from "axios";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      films: TMDB.films,
      faves: [],
      current: {}
    }
  }
  componentDidMount(){
    this.getFilms()
  }
  getFilms = async(page=1)=>{
    const apiKey = process.env.REACT_APP_TMDB_API_KEY //getting the API_KEY stored in the .env file
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en&page=${page}`

    const response = await axios.get(url);

    this.setState({
      films: response.data.results
    })
  }
  handleFaveToggle = (film)=>{
    const faves = this.state.faves.slice();
    const filmIndex = faves.indexOf(film);
    
    //If the film is already in their favorites, take it out of the faves array.
    if (filmIndex >= 0) {
      faves.splice(filmIndex, 1);
    } 
    //If the film is not in their favorites, add it to the faves array.
    if (filmIndex === -1){
      faves.push(film);
    }
    this.setState({ 
      faves: faves 
    })
  }
  handleDetailsClick = async (film) => {
    const apiKey = process.env.REACT_APP_TMDB_API_KEY //getting the API_KEY stored in the .env file
    const url = `https://api.themoviedb.org/3/movie/${film.id}?api_key=${apiKey}&append_to_response=videos,images&language=en`
    
    const response = await axios.get(url);
    
    this.setState({
      current: response.data
    })
  }
  render() {
    return (
      <div className="film-library">
        <FilmListing 
        films={this.state.films} 
        onFaveToggle={this.handleFaveToggle} 
        faves={this.state.faves}
        handleDetailsClick={this.handleDetailsClick}
        getFilms={this.getFilms}/>

        <FilmDetails film={this.state.current} />
      </div>
    );
  }
}

export default App;