import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

//importing UI design styling for component
import './login-view.scss';


export function LoginView(props) {
  // const [username, setUsername] = props.Username;
  // const [password, setPassword] = props.password;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // call useState() with empty string b/c this is the initial value of your login variable

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Requried');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be at least 6 characters long');
      isReq = false;
    }

    return isReq;

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://sana-movie-app.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
        });
    }
  };

  return (
    <Container fluid className='LoginContainer'>
      <Row className='LoginHeader'>
        <Col>
          <h3>Welcome to myFlix</h3>
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        <Col></Col>
        <Col>
          <Card className="text-center" bg='dark' text='light'>
            <Card.Body>
              <Card.Title>Log in to your account</Card.Title>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label className='usernameLabel'>Username:</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                  {/* code added here to display validation error */}
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                  {/* code added here to display validation error */}
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>

  );
}

LoginView.PropTypes = {

  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    username: state.user
  };
}

export default connect(mapStateToProps, { setUser })(LoginView);