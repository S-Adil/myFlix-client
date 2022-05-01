//imports react into the file and allows you to create new instances of generic React.Component
//template or blueprint for creating new components
import React from 'react';
//export keyword exposes MainView component which makes it available for use by other components
//you can now import components into other files
//class keyoword states that component is a class component(as opposed to function component)
//extend keyword for extending from React.Component, create MainView comp using generic React.Comp template as a foundation
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    //super(); initializes your component’s state, and without it, you’ll get an error if you try to use this.state inside constructor(). Can omit if you don't use this.state
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
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

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView */
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0)
      return <div className="main-view" />;

    return (
      <div className="main-view">
        {/* If the state of 'selectedMovie' is not null, that selected movie will be returned otherwise, all "movies will be returned */}
        {selectedMovie
          //written with ternary operator for if else in JS, thats what the ? and : are for

          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movieData={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
          ))
        }
      </div>
    );
  }

}