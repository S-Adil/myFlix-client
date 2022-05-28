import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

//importing UI design styling for component
import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    //super(); initializes your component’s state, and without it, you’ll get an error if you try to use this.state inside constructor(). Can omit if you don't use this.state
    super();

    // Initial state is set to null
    this.state = {
      movies: [],
      user: null
    };
  }

  addMovie(movie, user) {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.post(`https://sana-movie-app.herokuapp.com/users/${username}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          user: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    //is this supposed to be movieData?
    const { movie, user, onClick, onBackClick } = this.props;


    return (
      <Container fluid>
        <Card bg='dark' text='light'>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>

            <Card.Text>

              <p>{movie.Description}</p>

              <p>
                Director: <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link">{movie.Director.Name}</Button>
                </Link>
              </p>

              <p>
                Genre: <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link">{movie.Genre.Name}</Button>
                </Link>
              </p>

            </Card.Text>
            <Button variant="dark" onClick={() => { this.addMovie(movie, user) }}>Add movies to Favourites</Button>
          </Card.Body>
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