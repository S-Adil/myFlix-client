import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Card, CardGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

//importing UI design styling for component
import './profile-view.scss';



export function UserUpdate() {
  // Declare hook for each input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  // call useState() with empty string b/c this is the initial value of your login variable


  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [birthdayErr, setBirthdayErr] = useState('');

  const userToken = localStorage.getItem('user');

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
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Please enter a valid email');
      isReq = false;
    }
    if (!birthday) {
      setBirthdayErr('Birthday is required');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    const token = localStorage.getItem('token');

    if (isReq) {
      axios.put(`https://sana-movie-app.herokuapp.com/users/${userToken}`,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        },
        { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Profile has been updated :) ')
          localStorage.setItem("user", response.data.Username)
          window.open(`/users/${response.data.Username}`, '_self');
        })
        .catch(response => {
          console.error(response);
          alert('Unable to update');
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <Form>
            <h3>Update your Profile</h3>
            <p></p>
            <Form.Group controlId='formUsername' className='upd-form-inputs'>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)} required
                placeholder='Enter a username'
              />
              {/* code added here to display validation error */}
              {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>

            <Form.Group controlId='formPassword' className='upd-form-inputs'>
              <Form.Label>Password:</Form.Label>
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

            <Form.Group controlId='formEmail' className='upd-form-inputs'>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)} required
                placeholder='Enter an email'
              />
              {/* code added here to display validation error */}
              {emailErr && <p>{emailErr}</p>}
            </Form.Group>

            <Form.Group controlId='formBirthday' className='upd-form-inputs'>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="text"
                value={birthday}
                onChange={e => setBirthday(e.target.value)} required
                placeholder='Enter your birthday'
              />
              {/* code added here to display validation error */}
              {birthdayErr && <p>{birthdayErr}</p>}
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>Update</Button>
            <p></p>
            <p><Link to={`/users/${userToken}`}>Back to Profile</Link></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

UserUpdate.PropTypes = {

  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired

};

let mapStateToProps = state => {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { setUser })(UserUpdate);