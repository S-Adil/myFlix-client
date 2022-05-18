import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Button, Card, CardGroup } from 'react-bootstrap';

//importing UI design styling for component
import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  // call useState() with empty string b/c this is the initial value of your login variable

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [birthdayErr, setBirthdayErr] = useState('');

  //validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be at least 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be at least 6 characters long');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email is required');
      isReq = false;
    } else if (indexOf('@') === -1) {
      setEmailErr('Please enter a valid email');
      isReq = false;
    }
    if (!birthday) {
      setBirthdayErr('Birthday is required');
      isReq = false;
    }//else if(){}

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://sana-movie-app.herokuapp.com/registration', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          props.onLoggedIn(data);
          window.open('/', '_self');
          // The second argument '_self' is necessary so that
          // the page will open in the current tab
        })
        .catch(e => {
          console.log('error registering the user');
          alert('Something wasn\'t entered right');
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.label>Username:</Form.label>
              <Form.Control
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)} required
                placeholder='Enter a username'
              />
              {/* code added here to display validation error */}
              {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>

            <Form.Group>
              <Form.label>Password:</Form.label>
              <Form.Control
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)} required
                placeholder='Enter a password'
                minLength="8"
              />
              {/* code added here to display validation error */}
              {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>

            <Form.Group>
              <Form.label>Email:</Form.label>
              <Form.Control
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)} required
                placeholder='Enter an email'
              />
              {/* code added here to display validation error */}
              {emailErr && <p>{emailErr}</p>}
            </Form.Group>

            <Form.Group>
              <Form.label>Birthday:</Form.label>
              <Form.Control
                type="text"
                value={birthday}
                onChange={e => setBirthday(e.target.value)} required
                placeholder='Enter your birthday'
              />
              {/* code added here to display validation error */}
              {birthdayErr && <p>{birthdayErr}</p>}
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>

  );
}

RegistrationView.PropTypes = {

  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired

};