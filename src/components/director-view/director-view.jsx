import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

//importing UI design styling for component
import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    //is this supposed to be movieData?
    const { director, onClick, onBackClick } = this.props;

    return (
      <Container>
        <Card bg='dark' text='light'>
          <Card.Body>
            <Card.Title>{director.Name}</Card.Title>

            <Card.Text>

              <p>Bio: {director.Bio}</p>
              <p>Birth Year: {director.Birth}</p>
              <p>Year of Death: {director.Death}</p>

            </Card.Text>
            <Button variant='dark' onClick={() => { onBackClick() }}>Back</Button>

          </Card.Body>
        </Card>
      </Container>
    );
  }
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

