import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
//importing UI design styling for component
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;

    return (
      <Card bg='dark' text='light'>
        <Card.Img variant="top" src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.PropTypes = {
  /*
  1)The props object must include a movie object (shape({...}) means that it’s an object).

  2)The movie prop (object) may contain a Title key; if it does, then it must be of type string.

  3)The props object must contain onMovieClick and it must be a function */

  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};