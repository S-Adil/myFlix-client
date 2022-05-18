import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import PropTypes from 'prop-types';
import { Button, Card, Container } from 'react-bootstrap';

//importing UI design styling for component
import './genre-view.scss';

export function GenreView(props) {

  //is this supposed to be movieData?
  const { movie, genre, onBackClick } = this.props;

  return (
    <Container>
      <Card bg='dark' text='light'>
        <Card.Body>
          <Card.Title>{genre.Name}</Card.Title>
          <Card.Text>{genre.Description}</Card.Text>
        </Card.Body>
        <Button onClick={() => onBackClick(null)} variant="link">Back</Button>
      </Card>
    </Container>
  );

}

GenreView.PropTypes = {
  /*
  1)The props object must include a genre object (shape({...}) means that it’s an object).

  2)The genre prop (object) may contain a Name key; if it does, then it must be of type string.

  3)The props object must contain onBackClick and it must be a function */

  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }),
  onBackClick: PropTypes.func.isRequired
}