import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {
  render() {
    //is this supposed to be movieData?
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>

        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>

        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>

      </div>
    );
  }
}

MovieView.PropTypes = {
  /*
  1)The props object must include a movie object (shape({...}) means that it’s an object).

  2)The movie prop (object) may contain a Title key; if it does, then it must be of type string.

  3)The props object must contain onMovieClick and it must be a function */

  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};