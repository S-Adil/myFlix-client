//imports react into the file and allows you to create new instances of generic React.Component
//template or blueprint for creating new components
import React from 'react';
//export keyword exposes MainView component which makes it available for use by other components
//you can now import components into other files
//class keyoword states that component is a class component(as opposed to function component)
//extend keyword for extending from React.Component, create MainView comp using generic React.Comp template as a foundation

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
      movies: [
        {
          _id: 1, Title: 'Inception', Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.(Summary courtesy of IMDb)', ImagePath: "..."
        },
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.(Summary courtesy of IMDb)', ImagePath: '...' },
        { _id: 3, Title: 'Gladiatior', Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.(Summary courtesy of IMDb)', ImagePath: '...' }
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;


    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

    return ( //written with ternary operator for if else in JS, thats what the ? and : are for
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}