import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

//importing UI design styling for component
import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    //is this supposed to be movieData?
    const { genre, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card bg='dark' text='light'>
              <Card.Body>
                <Card.Title>Genre: {genre.Name}</Card.Title>

                <Card.Text>Description: {genre.Description}</Card.Text>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
GenreView.PropTypes = {
  /*
  1)The props object must include a director object (shape({...}) means that it’s an object).

  2)The director prop (object) may contain a Name key; if it does, then it must be of type string.

  3)The props object must contain onBackClick and it must be a function */

  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
}

