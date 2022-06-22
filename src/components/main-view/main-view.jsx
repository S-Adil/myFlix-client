//imports react into the file and allows you to create new instances of generic React.Component
//template or blueprint for creating new components
import React from 'react';
//export keyword exposes MainView component which makes it available for use by other components
//you can now import components into other files
//class keyoword states that component is a class component(as opposed to function component)
//extend keyword for extending from React.Component, create MainView comp using generic React.Comp template as a foundation

import axios from 'axios';
import { connect } from 'react-redux';

// BrowserRouter component is used to implement state-based routing.
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
// #0
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/

import { LoginView } from '../login-view/login-view';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UserUpdate } from '../profile-view/user-update';
import { NavigationBar } from '../navbar/navbar';


//React-bootstrap imports
import { Container, Row, Col } from 'react-bootstrap';

//importing UI design styling for component
import './main-view.scss';



// #2 export keyword removed from here
class MainView extends React.Component {

  // constructor() {
  //   //super(); initializes your component’s state, and without it, you’ll get an error if you try to use this.state inside constructor(). Can omit if you don't use this.state
  //   super();

  //   // Initial state is set to null
  //   this.state = {
  //     // #3 movies state removed from here

  //     selectedMovie: null,
  //     user: null
  //   };
  // }


  getMovies(token) {
    axios.get('https://sana-movie-app.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {

        // #4
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  componentDidMount() {
    // code executed right after the component is added to the DOM.
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      const { setUser } = this.props;
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
    const { setUser } = this.props;
    setUser(authData.user.Username);

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

  render() {
    // #5 movies and user is extracted from this.props rather than from the this.state
    let { user, movies } = this.props;



    return (
      <Router>
        <NavigationBar user={user} />
        <Container fluid>
          <Row className="main-view justify-content-md-center">

            <Route exact path="/" render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              // #6
              return <MoviesList movies={movies} />


            }} />
            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
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
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />

            <Route path="/genres/:name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />

            <Route path={`/users/${user}`} render={({ history, match }) => {
              if (!user) return <LoginView
                onLoggedIn={user => this.onLoggedIn(user)} />
              if (movies.length === 0) return <div className="main-view" />;
              return <Col>
                <ProfileView history={history} movies={movies} user={user} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />

            <Route path={`/users/user-update/${user}`}
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />
                return <Col>
                  <UserUpdate />
                </Col>
              }} />

          </Row>
        </Container>
      </Router>


    );
  }
}

// #7
let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}

// #8
export default connect(mapStateToProps, { setMovies, setUser })(MainView);




