import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container } from 'react-bootstrap';

//importing UI design styling for component
import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    //is this supposed to be movieData?
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Card bg='dark' text='light'>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
          </Card.Body>
          <Button onClick={() => onBackClick(null)} variant="link">Back</Button>
        </Card>
      </Container>
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
  onBackClick: PropTypes.func.isRequired
}