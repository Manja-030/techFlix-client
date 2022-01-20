import React from 'react';
import axios from 'axios';
import { Row, Col, Navbar, Nav } from 'react-bootstrap';

import { GiPopcorn } from 'react-icons/gi';
import './main-view.scss';

import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /*When a movie is clicked, this function is called and updates the state of the `selectedMovie` property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that user*/

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegistered(user) {
    this.setState({
      user
    });
  }

  getMovies(token) {
    axios.get('https://tech-and-popcorn.herokuapp.com/movies', {
      headers: { Authorization:`Bearer ${token}`}
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
    const { movies, selectedMovie, user } = this.state;
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
    if (!user)
      return (
        <RegistrationView onRegistered={(user) => this.onLoggedIn(user)} />
      );

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view justify-content-md-center">
        <Navbar
          className="mb-5"
          id="techFlixNav"
          bg="dark"
          variant="dark"
          expand="lg"
          sticky="top"
        >
          <Navbar.Brand id="appName" href="#home">
            <GiPopcorn />
            techFlix
          </Navbar.Brand>
          <Navbar.Toggle className="toggle" />
          <Navbar.Collapse className="justify-content-end toggle">
            <Nav.Link id="link" href="">
              MyPage
            </Nav.Link>
            <Nav.Link id="link" href="">
              Movies
            </Nav.Link>
            <Nav.Link id="link" href="">
              Logout
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <Row className="main-view justify-content-md-center">
          {selectedMovie ? (
            <Col md={9}>
              <MovieView
                movie={selectedMovie}
                onBackClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ) : (
            movies.map((movie) => (
              <Col md={4}>
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onMovieClick={(movie) => {
                    this.setSelectedMovie(movie);
                  }}
                />
              </Col>
            ))
          )}
        </Row>
      </div>
    );
  }
}

export default MainView;
