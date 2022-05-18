import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

//importing UI design styling for component
import './director-view.scss';

export function DirectorView(props) {

  const { director, onBackClick } = this.props;

  return (
    <Container>
      <Card bg='dark' text='light'>
        <Card.Body>
          <Card.Title>{director.Name}</Card.Title>
          <Card.Text>{director.Bio}</Card.Text>
          <Card.Text>{director.Birth}</Card.Text>
          <Card.Text>{director.Death}</Card.Text>
        </Card.Body>
        <Button onClick={() => onBackClick(null)} variant="link">Back</Button>
      </Card>
    </Container>
  );
}

DirectorView.PropTypes = {
  /*
  1)The props object must include a director object (shape({...}) means that it’s an object).

  2)The director prop (object) may contain a Name key; if it does, then it must be of type string.

  3)The props object must contain onBackClick and it must be a function */

  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
}