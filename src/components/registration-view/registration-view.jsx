import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { setUser, validateInput } from '../../actions/actions';

import PropTypes from 'prop-types';

import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap';
import './registration-view.scss';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

function RegistrationView({ user, setUser, validateInput }) {
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');

  useEffect(() => {
    document.body.className = 'background-image';
  }, []);

  useEffect(() => {
    setUser({
      Username: '',
      Password: '',
      Email: '',
      Birthday: '',
      FavoriteMovies: [],
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let isReq = validate();
    if (isReq) {
      axios
        .post(`https://tech-and-popcorn.herokuapp.com/users`, {
          Username: user.Username,
          Password: user.Password,
          Email: user.Email,
          Birthday: user.Birthday,
        })
        .then(() => {
          alert('Registration successful. You can login now!');
          window.open('/', '_self'); //2nd argument "_self" is needed so that the page will open in the current tab
        })
        .catch((error) => {
          console.log(error);
          alert('Unable to register.');
        });
    }
  };

  const validate = () => {
    let isReq = true;

    if (!user.Username) {
      setUsernameError('Username is required (at least 4 characters).');
      isReq = false;
    } else if (user.Username.length < 4) {
      setUsernameError('Username must be at least 4 characters long.');
      isReq = false;
    }

    if (!user.Password) {
      setPasswordError('Password is required (at least 6 characters).');
      isReq = false;
    } else if (user.Password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isReq = false;
    }

    if (!user.Email) {
      setEmailError('Email is required.');
      isReq = false;
    } else if (user.Email.indexOf('@') === -1) {
      setEmailError('Email is not valid.');
      isReq = false;
    }

    if (!user.Birthday) {
      setBirthdayError('Please enter your Birthday.');
      isReq = false;
    }

    return isReq;
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card className="register-card">
            <Card.Header className="text-center register-title">
              Register at techFlix
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => validateInput(e.target.value, 'Username')}
                    placeholder="Enter a username"
                  />
                  <div className="register-text">
                    {usernameError && <p> {usernameError}</p>}
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(e) => validateInput(e.target.value, 'Password')}
                    placeholder="Enter your password"
                  />
                  <div className="register-text">
                    {passwordError && <p> {passwordError}</p>}
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => validateInput(e.target.value, 'Email')}
                    placeholder="Enter your email address"
                  />
                  <div className="register-text">
                    {emailError && <p> {emailError}</p>}
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e) => validateInput(e.target.value, 'Birthday')}
                  />
                  <div className="register-text">
                    {birthdayError && <p> {birthdayError}</p>}
                  </div>
                </Form.Group>

                <Button
                  type="Submit"
                  className="register-button"
                  variant="outline-danger"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  users: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
  setUser: PropTypes.func,
  validateInput: PropTypes.func,
};

export default connect(mapStateToProps, { setUser, validateInput })(
  RegistrationView
);
