import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import './main-view.scss';

import MoviesList from '../movies-list/movies-list';
import Navigation from '../navigation/navigation.jsx';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import MovieView from '../movie-view/movie-view';
import ProfileView from '../profile-view/profile-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';

class MainView extends React.Component {
  constructor() {
    super();
    //initial state is set to null
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
      //  this.getGenres(accessToken);
    }
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    //this.getGenres(authData.token); ** I don't think I need this  **
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  onRegistered(user) {
    this.setState({
      user,
    });
  }

  getMovies(token) {
    axios
      .get(`https://tech-and-popcorn.herokuapp.com/movies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // ** I don't think I need this piece of code: **
  /* getGenres(token) {
    axios
      .get('https://tech-and-popcorn.herokuapp.com/genres', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          genres: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }*/

  render() {
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <Navigation logOut={() => this.onLoggedOut()} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      ;
                    </Col>
                  );

                if (movies.length === 0) return <div className="main-view" />;

                return <MoviesList movies={movies} />;
              }}
            />
            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col>
                    <RegistrationView />
                  </Col>
                );
              }}
            />
            <Route
              path={`/users/${user}`}
              render={({ history }) => {
                if (!user) return <Redirect to="/" />;
                return (
                  <Col>
                    <ProfileView
                      user={user}
                      movies={movies}
                      logOut={() => this.onLoggedOut()}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              exact
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      ;
                    </Col>
                  );
                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find(
                        (movie) => movie._id === match.params.movieId
                      )}
                      user={user}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              exact
              path="/director/:Name"
              render={({ match }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      ;
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(
                          (movie) => movie.Director.Name === match.params.name
                        ).Director
                      }
                    />
                  </Col>
                );
              }}
            />
            <Route
              exact
              path="/genres/:id"
              render={({ match }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      ;
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((movie) =>
                          movie.Genre.includes(match.params.id)
                        ).Genre
                      }
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
