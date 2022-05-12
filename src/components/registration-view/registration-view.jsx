import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

//importing UI design styling for component
import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  // call useState() with empty string b/c this is the initial value of your login variable

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://sana-movie-app.herokuapp.com/movies', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
        // The second argument '_self' is necessary so that
        // the page will open in the current tab
      })
      .catch(e => {
        console.log('error registering the user');
        alert('Something wasn\'t entered right');
      });
  };

  return (
    <Form>
      <Form.Group>
        <Form.label>Username:</Form.label>
        <Form.Control
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)} required
          placeholder='Enter a username'
        />
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
      </Form.Group>

      <Form.Group>
        <Form.label>Email:</Form.label>
        <Form.Control
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)} required
          placeholder='Enter an email'
        />
      </Form.Group>

      <Form.Group>
        <Form.label>Birthday:</Form.label>
        <Form.Control
          type="text"
          value={birthday}
          onChange={e => setBirthday(e.target.value)} required
          placeholder='Enter your birthday'
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
    </Form>
  );
}