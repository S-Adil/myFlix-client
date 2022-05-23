import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';

//importing UI design styling for component
import './profile-view.scss';


export function ProfileView(props) {

  // Declare hook for each input, initialize to empty state
  const [user, setUser] = useState({});
  const [favouriteMoviesList, setFavouriteMovieList] = useState({});
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  // const [birthday, setBirthday] = useState('');
  // const [favouriteMoviesList, setFavouriteMovieList] = useState('');

  const token = localStorage.getItem('token');

  const getUserData = () => {
    axios.get(`https://sana-movie-app.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        setUser(response.data);
        setFavouriteMovieList(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  // used to replace componentDidMount and other lifecycle methods
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null)
      username = localStorage.getItem('user')
    getUserData(token, username);
  }, []);

  //Get list of user's favourite movies
  //  const favMovies = props.movies.filter((m) => user.FavouriteMovies.includes(m._id));


  // function to update user info
  const handleUpdate = (e) => {
    const username = localStorage.getItem('user');
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.put(`https://sana-movie-app.herokuapp.com/${username}`, {
      Username: user.Username,
      Password: user.Password,
      Email: user.Email,
      Birthday: user.Birthday
    })
      .then(response => {
        setUser(response.data)
      })
      .catch(e => {
        console.log('Could not update user info')
      });
  }

  const removeFavMovie = (props) => {

    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://sana-movie-app.herokuapp.com/users/${username}/movies/${props.movies._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log(response);
        setUser(response.data);
        alert("Movie has been deleted from favourites!");
        window.open(`/movies/${props.movies._id}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const deregisterUser = () => {

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.delete(`https://sana-movie-app.herokuapp.com/users/${username}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      console.log(response);
      alert("User has been deregistered");
      window.open('/', "_self");
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  const onLoggedOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }

  return (

    <Container fluid className='ProfileViewContainer'>
      <Row className='ProfileHeader'>
      </Row>
      <Row className='justify-content-md-center'>
        <Col></Col>
        <Col>
          <Card className="text-center" bg='dark' text='light'>
            <Card.Body>
              <Card.Title>Account Information</Card.Title>

              <Form>

                <Form.Group controlId="profileUsername">
                  <Form.Label className='profileUsernameLabel'>Username: {user.Username} </Form.Label>
                </Form.Group>

                <Form.Group controlId="profileEmail">
                  <Form.Label>Email: {user.Email} </Form.Label>
                </Form.Group>

                <Form.Group controlId="profileBirthday">
                  <Form.Label>Birthday: {user.Birthday} </Form.Label>
                </Form.Group>

                <Card className="text-center" bg='dark' text='light'>
                  <Card.Title>Favourite Movies:</Card.Title>
                  <Card.Body>
                    {user.FavouriteMovies}
                  </Card.Body>
                </Card>
              </Form>

            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
        {/* Enter edit button for username here -> link to update user page */}
      </Row>
    </Container>
  );
}



ProfileView.PropTypes = {

  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}