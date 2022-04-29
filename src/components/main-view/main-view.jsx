//imports react into the file and allows you to create new instances of generic React.Component
//template or blueprint for creating new components
import React from 'react';
//export keyword exposes MainView component which makes it available for use by other components
//you can now import components into other files
//class keyoword states that component is a class component(as opposed to function component)
//extend keyword for extending from React.Component, create MainView comp using generic React.Comp template as a foundation
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  // render function returns visual representation of the component (what will be displayed on the screen)
  // the inside looks like HTML but it's JSX
  //render fcn can only have one root element

  //adding a movies state that will hold the list of movies. MainView state is initialized with an object containing movies implemented by this.state inside a method called constructor
  //constructor method is used to create component. code inside it will be the first thing to be executed for a component
  //constructor() method is executed before the render() method. This is why constructor is the place to initialize a state’s values.


  constructor() {
    //super(); initializes your component’s state, and without it, you’ll get an error if you try to use this.state inside constructor(). Can omit if you don't use this.state
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    }
  }


  componentDidMount() {

    // code executed right after the component is added to the DOM.

    axios.get('https://sana-movie-app.herokuapp.com/movies').then(response => {
      this.setState({
        movies: response.data
      });
    })
      .catch(error => {
        console.log(error);
      });

  }

  componentDidUpdate() {
    // code executed right after component's state or props are changed.
  }

  componentWillUnmount() {
    // code executed just before the moment the component gets removed from the DOM.
  }


  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;


    if (movies.length === 0)
      return <div className="main-view" />;

    return ( //written with ternary operator for if else in JS, thats what the ? and : are for
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movieData={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
          ))
        }
      </div>
    );
  }

}