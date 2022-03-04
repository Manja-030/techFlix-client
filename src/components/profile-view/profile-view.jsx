import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import './profile-view.scss';
import axios from 'axios';

function ProfileView({ user, movies }) {
  const localUsername = localStorage.getItem('user'); // real username to make axios requests
  const token = localStorage.getItem('token'); // jwt token to make axios requests

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');

  const [favorites, setFavorites] = useState([]);

  console.log(`https://tech-and-popcorn.herokuapp.com/users/${localUsername}`);
  console.log(`https://tech-and-popcorn.herokuapp.com/users/${user}`);

  /* When component renders for the first time, this fetches user data */
  useEffect(() => {
    axios
      .get(`https://tech-and-popcorn.herokuapp.com/users/${localUsername}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setUsername(response.data.Username);
        setEmail(response.data.Email);
        setPassword(response.data.Password);
        setBirthday(response.data.Birthday);
        console.log(response.data.Username);
        console.log(response.data.Email);
        console.log(username);
        console.log(email);
        console.log(password);
        console.log(birthday);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getFavs(user.FavMovies);
  }, []);

  /* converts Array of IDs into Object of movies */
  const getFavs = (favs) => {
    let favMovieList = [];
    movies.forEach((movie) => {
      favs.includes(movie._id) ? favMovieList.push(movie) : favMovieList;
    });
    setFavorites(favMovieList);
  };

  const validateChanges = () => {
    let isReq = true;

    if (!username) {
      setUsernameError('Username is required (at least 4 characters).');
      isReq = false;
    } else if (username.length < 4) {
      setUsernameError('Username must be at least 4 characters long.');
      isReq = false;
    }

    if (!password) {
      setPasswordError('Password is required (at least 6 characters).');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isReq = false;
    }

    if (!email) {
      setEmailError('Email is required.');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailError('Email is not valid.');
      isReq = false;
    }

    if (!birthday) {
      setBirthdayError('Please enter your birthday.');
      isReq = false;
    }

    return isReq;
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    const isReq = validateChanges();
    if (isReq) {
      axios
        .put(
          'https://tech-and-popcorn.herokuapp.com/users/${user.Username}',
          {
            Username: user.Name,
            Password: user.Password,
            Email: user.Email,
            Birthday: user.Birthday,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert('Update of profile successful.');
        })
        .catch((response) => {
          console.error(response);
          alert('Update of profile not successful.');
        });
    }
  };

  const handleAccountDelete = () => {
    axios
      .delete('https://tech-and-popcorn.herokuapp.com/users/${user.Username}', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.info(response);
        logOut();
      });
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
          <p>Profile Form to update</p>
          <Form className="profile-form">
            <Form.Group className="mb-3">
              <Form.Label className="profile-text">Username:</Form.Label>
              <Form.Control
                type="text"
                defaultValue={user.Username}
                onChange={(e) => validateChanges(e.target.value)}
                required
                placeholder="Enter a username"
              />
              <div className="profile-text">
                {usernameError && <p> {usernameError}</p>}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="profile-text">Password:</Form.Label>
              <Form.Control
                type="password"
                defaultValue={user.Password}
                onChange={(e) => validateChanges(e.target.value)}
                required
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
                defaultValue={user.Email}
                onChange={(e) => validateChanges(e.target.value)}
                required
                placeholder="Enter your email address"
              />
              <div className="profile-text">
                {emailError && <p> {emailError}</p>}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="profile-text">Birthday:</Form.Label>
              <Form.Control
                type="date"
                defaultValue={user.Birthday}
                onChange={(e) => validateChanges(e.target.value)}
              />
              <div className="profile-text">
                {birthdayError && <p> {birthdayError}</p>}
              </div>
            </Form.Group>

            <Button
              type="Submit"
              className="profile-btn"
              variant="outline-danger"
              onClick={handleUpdateProfile}
            >
              Save Changes
            </Button>
            <Button
              type="Submit"
              className="profile-btn"
              variant="outline-danger"
              onClick={handleAccountDelete}
            >
              Delete Account
            </Button>
          </Form>
        </Col>
        <Col>
          <p>Movieposter of Favorite Movies and Remove-Buttons</p>
        </Col>
      </Row>
    </Container>
  );
}

ProfileView.propTypes = {
  Username: PropTypes.shape({
    Favorites: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
};

export default ProfileView;
