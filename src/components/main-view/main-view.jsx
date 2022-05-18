//imports react into the file and allows you to create new instances of generic React.Component
//template or blueprint for creating new components
import React from 'react';
//export keyword exposes MainView component which makes it available for use by other components
//you can now import components into other files
//class keyoword states that component is a class component(as opposed to function component)
//extend keyword for extending from React.Component, create MainView comp using generic React.Comp template as a foundation

import axios from 'axios';

// BrowserRouter component is used to implement state-based routing.
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navbar/navbar';

//React-bootstrap imports
import { Container, Row, Col } from 'react-bootstrap';

//importing UI design styling for component
import './main-view.scss';


export class MainView extends React.Component {

  constructor() {
    //super(); initializes your component’s state, and without it, you’ll get an error if you try to use this.state inside constructor(). Can omit if you don't use this.state
    super();

    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }



  componentDidMount() {
    // code executed right after the component is added to the DOM.
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  componentDidUpdate() {
    // code executed right after component's state or props are changed.
  }

  componentWillUnmount() {
    // code executed just before the moment the component gets removed from the DOM.
  }


  onLoggedIn(authData) {
    console.log(authData);

    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }


  getMovies(token) {
    axios.get('https://sana-movie-app.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, user } = this.state;



    return (
      <Router>
        <NavigationBar user={user} />
        <Container>
          {/* <button onClick={() => { this.onLoggedOut() }}>Logout</button> */}
          <Row className="main-view justify-content-md-center">

            <Route exact path="/" render={() => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView */
              if (!user) return <Col>
                <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)} />;
              </Col>

              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;

              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />

            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col lg={8} md={8}>
                <RegistrationView />
              </Col>
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {

              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/directors/:name" render={({ match, history }) => {

              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={8}>
                <DirectorView movie={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/genres/:name" render={({ match, history }) => {

              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>

              if (movies.length === 0) return <div className="main-view" />;

              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            {/* route for link on main-view to profile-view */}


            <Route path={`/users/${user}`} render={({ history, match }) => {
              if (!user) return <LoginView
                onLoggedIn={user => this.onLoggedIn(user)} />
              if (movies.length === 0) return <div className="main-view" />
              return
              <ProfileView history={history} movies={movies} user={user === match.params.username} />
            }} />


            <Route path={`/user-update/${user}`}
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />
                return <Col>
                  <UserUpdate user={user}
                    onBackClick={() => history.goBack()} />
                </Col>
              }} />
          </Row>
        </Container>
      </Router>


    );
  }
}




