import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import './profile-view.scss';
import axios from 'axios';

function ProfileView({ movies, logOut }) {
  console.log('movies prop that is imported from MainView:', movies);
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

  const [favorites, setFavorites] = useState([]); //array of movie objects that where added to the FavoriteMovies array
  const [favIds, setFavIds] = useState([]); //array of movie IDs that where added to FavoriteMovies

  //convert array of IDs into array of movie objects
  const getFavs = (favs) => {
    let favoriteMovieList = [];
    movies.forEach((movie) => {
      favs.includes(movie._id) ? favoriteMovieList.push(movie) : null;
    });
    setFavorites(favoriteMovieList);
  };

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
        setFavIds(response.data.FavMovies);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // When favIds exist, then convert to array of movie objects
  useEffect(() => {
    favIds ? getFavs(favIds) : setFavorites({});
    console.log('favs in favIds: ' + favIds);
  }, [favIds]);

  // Event handler for updating user profile
  const handleUpdateProfile = (e) => {
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
          'https://tech-and-popcorn.herokuapp.com/users/${username}',
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
    axios
      .delete(
        `https://tech-and-popcorn.herokuapp.com/users/${username}/movies/${favId}`,
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
  const handleProfileDelete = () => {
    axios
      .delete('https://tech-and-popcorn.herokuapp.com/users/${username}', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log('Response after Delete', response.data);
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
        <Col>
          <h3 className="profile-title">Update Your Profile:</h3>
        </Col>
        <Col>
          <h3 className="profile-title">Favorite Movies:</h3>
        </Col>
      </Row>
      <Row>
        <Col>
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

        <Col>
          {' '}
          {/* This returns in error in console: favorites.map is not a function: {favorites.map((fav) => {
            return (
              <div key={fav._id}>
                <MovieCard movie={fav} />;<Button>Remove</Button>
              </div>
            );
          })}*/}
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
