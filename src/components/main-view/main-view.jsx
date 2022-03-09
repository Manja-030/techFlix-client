import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
    };
  }

  componentDidMount() {
    axios
      .get('https://tech-and-popcorn.herokuapp.com/movies')
      .then((response) => {
        this.setState({ movies: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

<<<<<<< Updated upstream
=======
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
  }

  onRegistered(user) {
    this.setState({
      user,
    });
  }
  //https://tech-and-popcorn.herokuapp.com
  getMovies(token) {
    axios
      .get('http://localhost:8080/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
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

>>>>>>> Stashed changes
  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view" />;

<<<<<<< Updated upstream
    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
=======
                return movies.map((m) => (
                  <Col
                    sm={12}
                    md={6}
                    lg={3}
                    key={m._id}
                    className="movie-cards"
                  >
                    <MovieCard movie={m} />
                  </Col>
                ));
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
                console.log('Match-Params:', match.params);
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
                      /*movie={movies.find(
                        (movie) => movie._id === match.params.movieId
                      )}*/
                      movieId={match.params.movieId}
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
>>>>>>> Stashed changes
              }}
            />
          ))
        )}
      </div>
    );
  }
}

export default MainView;
