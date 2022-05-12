import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
//importing UI design styling for component
import './login-view.scss';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // call useState() with empty string b/c this is the initial value of your login variable

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);

  };
  return (
    <Container fluid className='Container'>
      <Row className='LoginHeader' variant='text-light'>
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
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
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