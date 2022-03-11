import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import MovieCard from '../movie-card/movie-card';

import './profile-view.scss';
import axios from 'axios';

function ProfileView({ movies, logOut, user }) {
  console.log('movies prop that is imported from MainView:', movies);
  //console.log('user prop that is imported from MainView:', user);
  //console.log('Andyman FavMovies:', user.FavMovies);

  const localUsername = localStorage.getItem('user'); // real username to make axios requests
  const token = localStorage.getItem('token'); // jwt token to make axios requests

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  //objects that include error messages as a result of validateChanges
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');

  const [favorites, setFavorites] = useState([]); //array of movie objects

  //When component renders for the first time, this fetches user data
  useEffect(() => {
    axios
      .get(`https://tech-and-popcorn.herokuapp.com/users/${localUsername}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log('response.data:', response.data);
        setUsername(response.data.Username);
        setEmail(response.data.Email);
        setPassword(response.data.Password);
        setBirthday(response.data.Birthday);
        filterMovies(movies, response.data.FavMovies);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  console.log('Username:', username);
  console.log('Favorite Movies Objects', favorites);

  const filterMovies = (movies, favMovieIds) => {
    let filteredMovies = [];
    movies.forEach((movie) => {
      favMovieIds.includes(movie._id) ? filteredMovies.push(movie) : null;
    });
    setFavorites(filteredMovies);
  };
  {
    /*
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`https://tech-and-popcorn.herokuapp.com/movies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        filterMovies(response.data, { user }.FavMovies);
      });
  }, []);*/
  }

  /// NEW PIECE OF CODE ENDS HERE

  /*  
  //convert array of IDs into array of movie objects
  const getFavs = (favs) => {
    let favMovieObjectList = [];
    movies.forEach((movie) => {
      favs.includes(movie._id) ? favMovieObjectList.push(movie) : null;
    });
    setFavorites(favMovieObjectList);
    console.log('Favorites:', favorites);
  };

  // If favIds exist, then convert to array of movie objects
  useEffect(() => {
    favIds ? getFavs(favIds) : setFavorites({});
    console.log('favs in favIds: ' + favIds);
  }, [favIds]);
*/
  // Event handler for updating user profile
  const handleUpdateProfile = (e) => {
    console.log('handleUpdateProfile');
    e.preventDefault();
    console.log(
      'username, password, email, birthday:',
      username,
      password,
      email,
      birthday
    );
    let isValid = validateChanges();
    if (isValid) {
      axios
        .put(
          `https://tech-and-popcorn.herokuapp.com/users/${username}`,
          {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          console.log('response.data:', response.data);
          console.log('Username:', username);
          alert('Update of profile successful.');
        })
        .catch((error) => {
          console.log(username);
          console.error('updating profile not successful:' + error);
          alert('Update of profile not successful.');
        });
    }
  };
  //delete favorite from list of favorites:
  const deleteFav = (favId) => {
    console.log('deleteFav');
    axios
      .delete(
        `https://tech-and-popcorn.herokuapp.com/users/${username}/movies/${favId._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setFavIds(response.data.FavMovies);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // event handler to delete user profile
  const handleProfileDelete = (e) => {
    e.preventDefault();
    console.log('handleProfileDelete');
    axios
      .delete(`https://tech-and-popcorn.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Profile deleted.');
        logOut();
      })
      .catch((error) => {
        console.log('Error deleting the user', error);
      });
  };

  // function validates inputs in profile form:
  const validateChanges = () => {
    let isValid = true;

    if (username.length < 4) {
      setUsernameError('Username must have at least 4 characters.');
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError('Password must have at least 6 characters.');
      isValid = false;
    }

    if (email.indexOf('@') === -1) {
      setEmailError('Email is not valid.');
      isValid = false;
    }

    if (!birthday) {
      setBirthdayError('Please enter your birthday.');
      isValid = false;
    }

    return isValid;
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={8} md={5} lg={4} className="p-3 m-2">
          <h3 className="profile-title"> Update My Profile:</h3>

          <Form className="profile-form">
            <Form.Group className="mb-3">
              <Form.Label className="profile-text">Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
              <div className="profile-text">
                {usernameError && <p> {usernameError}</p>}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="profile-text">Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <div className="profile-text">
                {passwordError && <p> {passwordError}</p>}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="profile-text">Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
              />
              <div className="profile-text">
                {emailError && <p> {emailError}</p>}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="profile-text">Birthday:</Form.Label>
              <Form.Control
                type="text"
                value={birthday}
                placeholder="yyyy-mm-dd"
                onChange={(e) => setBirthday(e.target.value)}
              />
              <div className="profile-text">
                {birthdayError && <p> {birthdayError}</p>}
              </div>
            </Form.Group>{' '}
            <Link to="/profile">
              <Button
                type="submit"
                className="profile-btn"
                variant="outline-danger"
                onClick={handleUpdateProfile}
              >
                Save Changes
              </Button>
            </Link>
            <Button
              type="Submit"
              className="profile-btn"
              variant="outline-danger"
              onClick={handleProfileDelete}
            >
              Delete Account
            </Button>
          </Form>
        </Col>
        <Col xs={12} sm={8} md={6} lg={6} xl={6} className="p-3 m-2">
          <h3 className="profile-title"> My Favorite Movies:</h3>

          <Row>
            <div>
              {' '}
              {favorites &&
                favorites.map((favorites) => (
                  <Col
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    className="p-3"
                    key={favorites._id}
                  >
                    <MovieCard
                      className="profile-moviecard"
                      movie={favorites}
                    />
                    ;
                    <Button
                      type="submit"
                      variant="outline-danger"
                      onClick={deleteFav}
                    >
                      Remove
                    </Button>
                  </Col>
                ))}
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );

  ProfileView.propTypes = {
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        ImagePath: PropTypes.string,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.array,
        Director: PropTypes.shape({
          Name: PropTypes.string,
          Bio: PropTypes.string,
        }),
      })
    ),
    logOut: PropTypes.func.isRequired,
  };
}
export default ProfileView;
