import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Card, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';

//importing UI design styling for component
import './profile-view.scss';


export function ProfileView(props) {

  // Declare hook for each input, initialize to empty state
  const [userData, setUserData] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [favouriteMoviesList, setFavouriteMovieList] = useState([]);


  const token = localStorage.getItem('token');

  const getUserData = () => {
    const username = localStorage.getItem('user');
    axios.get(`https://sana-movie-app.herokuapp.com/users/${props.user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        setUserData(response.data);
        setUpdatedUser(response.data);
        //Get list of user's favourite movies
        setFavouriteMovieList(props.movies.filter((m) => response.data.FavouriteMovies.includes(m._id)));
      })
      .catch(function (error) {
        console.log(error);
      });

  }


  // used to replace componentDidMount and other lifecycle methods
  useEffect(() => {
    let source = axios.CancelToken.source();

    if (token !== null) {
      getUserData(source.token, props.user);
    }
    return () => {
      source.cancel();
    }
  }, []);




  // function to update user info
  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    const username = localStorage.getItem('user');
    axios.put(`https://sana-movie-app.herokuapp.com/users/${username}`, updatedUser,
      { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        setUserData(response.data);
        setUpdatedUser(updatedUser)
        alert('Profile has been updated');
        localStorage.setItem("user", response.data.Username)
      })
      .catch(e => {
        console.log('Could not update user info')
      });
  }
  const handleUpdate = (e) => {
    console.log('I got called');
    console.log(e.target.name, e.target.value);
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value
    });
  }

  const removeFavMovie = (props) => {

    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.delete(`https://sana-movie-app.herokuapp.com/users/${username}/movies/${props}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log(response);
        // Change state of favouriteMovieList so that it shows updated movie list
        setFavouriteMovieList(favouriteMoviesList.filter(m => m._id != props.movies._id));
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const deregisterUser = () => {

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.delete(`https://sana-movie-app.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      console.log(response);
      alert("User has been deregistered");
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.open('/', "_self");

    })
      .catch(error => {
        console.log(error);
      });
  }

  const onLoggedOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
                  <Form.Label className='profileUsernameLabel'>Username: {userData.Username} </Form.Label>
                </Form.Group>

                <Form.Group controlId="profileEmail">
                  <Form.Label>Email: {userData.Email} </Form.Label>
                </Form.Group>

                <Form.Group controlId="profileBirthday">
                  <Form.Label>Birthday: {userData.Birthday} </Form.Label>
                </Form.Group>

                <Card className="text-center" bg='dark' text='light'>
                  <Card.Title>Favourite Movies:</Card.Title>
                  <Card.Body>
                    {favouriteMoviesList.map((m) => {
                      return (
                        <div key={m._id}>
                          <img src={m.ImagePath} />
                          <Link to={`/movies/${m._id}`}>
                            <h4>{m.Title}</h4>
                          </Link>
                          <Button variant="dark" onClick={() => removeFavMovie(m._id)}>Remove from list</Button>
                        </div>
                      )
                    })
                    }
                  </Card.Body>
                </Card>
              </Form>
              <Nav.Link href="/">Back to Movies</Nav.Link>
            </Card.Body>
          </Card>
          <Form className='profile-form-update' onSubmit={(e) => handleSubmit(e)}>
            <h2>Want to change some of your information?</h2>
            <Form.Group controlId='formUsername' className='upd-form-inputs'>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type='text'
                name='Username'
                defaultValue={userData.Username}
                onChange={e => handleUpdate(e)}
                placeholder='Enter a username'
              />
            </Form.Group>

            {/* <Form.Group controlId='formPassword' className='upd-form-inputs'>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type='text'
                name='Password'
                onChange={e => handleUpdate(e)}
                placeholder='Enter a password'
                minLength="8"
              />
            </Form.Group> */}

            <Form.Group controlId='formEmail' className='upd-form-inputs'>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='text'
                name='Email'
                defaultValue={userData.Email}
                onChange={e => handleUpdate(e)}
                placeholder='Enter an email'
              />
            </Form.Group>

            <Form.Group controlId='formBirthday' className='upd-form-inputs'>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type='text'
                name='Birthday'
                defaultValue={userData.Birthday}
                onChange={e => handleUpdate(e)}
                placeholder='Enter your birthday'
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>Update</Button>
            <p></p>


          </Form>

          {/* Button to delete user */}
          <div>
            <Button variant="danger" type="submit" onClick={deregisterUser}>
              Delete Profile
            </Button>
          </div>
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