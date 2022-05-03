import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setUser, validateInput } from '../../actions/actions';
import { connect } from 'react-redux';

import { Row, Col, Button, Container, Figure, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './profile-view.scss';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    movies: state.movies,
  };
};

function ProfileView({ user, movies, movie, logOut, setUser, validateInput }) {
  const localUsername = localStorage.getItem('user'); // real username to make axios requests
  const token = localStorage.getItem('token'); // jwt token to make axios requests

  useEffect(() => {
    document.body.className = 'background-color';
  }, []);

  //objects that include error messages as a result of validateChanges:
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  //array of movie objects of user's favorite movies:
  const [favorites, setFavorites] = useState([]);

  //When component renders for the first time, this fetches user data
  useEffect(() => {
    axios
      .get(`https://tech-and-popcorn.herokuapp.com/users/${localUsername}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        let userData = {
          ...response.data,
          Birthday: response.data.Birthday.substring(0, 10),
        };
        setUser(userData);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    filterMovies(user.FavMovies);
  }, []);

  const filterMovies = (favMovieIds) => {
    let filteredMovies = [];
    movies.forEach((movie) => {
      favMovieIds.includes(movie._id)
        ? filteredMovies.push(movie)
        : filteredMovies;
    });
    setFavorites(filteredMovies);
  };

  // Event handler for updating user profile
  const handleUpdateProfile = (e) => {
    console.log('handleUpdateProfile');
    e.preventDefault();

    let isValid = validateChanges();
    if (isValid) {
      axios
        .put(
          `https://tech-and-popcorn.herokuapp.com/users/${localUsername}`,
          {
            Username: user.Username,
            Password: user.Password,
            Email: user.Email,
            Birthday: user.Birthday,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          alert('Update of profile successful.');
        })
        .catch((error) => {
          console.log('updating profile not successful:' + error);
          alert('Update of profile not successful.');
        });
    }
  };
  //delete favorite from list of favorites:
  const deleteFav = (movieId) => {
    axios
      .delete(
        `https://tech-and-popcorn.herokuapp.com/users/${localUsername}/movies/${movieId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        filterMovies(response.data.FavMovies);
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
      .delete(`https://tech-and-popcorn.herokuapp.com/users/${user.Username}`, {
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

    if (user.Username.length < 4) {
      setUsernameError('Username must have at least 4 characters.');
      isValid = false;
    }

    if (user.Password.length < 6) {
      setPasswordError('Password must have at least 6 characters.');
      isValid = false;
    }

    if (user.Email.indexOf('@') === -1) {
      setEmailError('Email is not valid.');
      isValid = false;
    }

    if (!user.Birthday) {
      setBirthdayError('Please enter your birthday.');
      isValid = false;
    }

    return isValid;
  };

  return (
    <Container className="mt-3">
      <Row className="mb-2">
        <Col className="mb-2">
          <Card className="info-card mb-3">
            <Card.Header className="profile-title">My Info</Card.Header>
            <Card.Body>
              <Card.Text>
                <span className="label">Username: </span>
                <span className="value">{user.Username}</span>
              </Card.Text>
              <Card.Text>
                <span className="label">Email: </span>
                <span className="value">{user.Email}</span>
              </Card.Text>
              <Card.Text>
                <span className="label">Birthday: </span>
                <span className="value">{user.Birthday.substring(0, 10)}</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-2">
          <Card className="update-card mb-3">
            <Card.Header className="profile-title">Update My Info</Card.Header>
            <Card.Body>
              <Form className="profile-form">
                <Form.Group className="mb-3">
                  <Form.Label className="profile-text">Username:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    defaultValue={user.Username}
                    onChange={(e) => validateInput(e.target.value, 'Username')}
                  />
                  <div className="profile-text">
                    {usernameError && <p> {usernameError}</p>}
                  </div>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="profile-text">Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={''}
                    onChange={(e) => validateInput(e.target.value, 'Password')}
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
                    onChange={(e) => validateInput(e.target.value, 'Email')}
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
                    defaultValue={user.Birthday}
                    placeholder="dd-mm-yyyy"
                    onChange={(e) => validateInput(e.target.value, 'Birthday')}
                  />
                  <div className="profile-text">
                    {birthdayError && <p> {birthdayError}</p>}
                  </div>
                </Form.Group>{' '}
                <Row>
                  <Col>
                    <Link to="/profile" className="submit-link">
                      <Button
                        size="sm"
                        type="submit"
                        className="profile-btn"
                        variant="outline-danger"
                        onClick={handleUpdateProfile}
                      >
                        Save Changes
                      </Button>{' '}
                    </Link>
                  </Col>
                  <Col>
                    <Button
                      size="sm"
                      type="Submit"
                      className="profile-btn"
                      variant="outline-danger"
                      onClick={handleProfileDelete}
                    >
                      Delete Account
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Container>
          <Card className="favMovie-card mb-3">
            <Card.Header className="profile-title">
              My Favorite Movies
            </Card.Header>
            <Card.Body>
              {favorites.length === 0 && (
                <div>There are currently no movies in your favorites list.</div>
              )}
              <Row>
                {favorites.map((favorites) => {
                  return (
                    <Col
                      xs={12}
                      sm={12}
                      md={6}
                      lg={4}
                      xl={4}
                      className="p-3 fav-movie"
                      key={favorites._id}
                    >
                      <Link to={`/movies/${movie._id}`}>
                        <Figure className="mb-2">
                          <Figure.Image
                            className="fav-card"
                            variant="top"
                            src={favorites.ImagePath}
                            alt={favorites.Title}
                            crossOrigin="true"
                          />
                        </Figure>
                      </Link>

                      <div>
                        <Button
                          size="sm"
                          type="submit"
                          variant="outline-danger"
                          className="profile-btn"
                          onClick={() => deleteFav(favorites._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </Row>
    </Container>
  );
}

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string,
      }).isRequired,
      ReleaseYear: PropTypes.string.isRequired,
      Genre: PropTypes.array.isRequired,
      _id: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Password: PropTypes.string,
    Birthday: PropTypes.string.isRequired,
    FavMovies: PropTypes.array.isRequired,
  }).isRequired,
  logOut: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  validateInput: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { setUser, validateInput })(
  ProfileView
);
