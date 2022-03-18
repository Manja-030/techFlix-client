import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from 'react-bootstrap';

import { setUser } from '../../actions/actions';
import { connect } from 'react-redux';

import './login-view.scss';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

function LoginView({ setUser, onLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameError('Username is required.');
      isReq = false;
    } else if (username.length < 4) {
      setUsernameError('Username must be at least 4 characters long.');
      isReq = false;
    }
    if (!password) {
      setPasswordError('Password is required.');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post('https://tech-and-popcorn.herokuapp.com/login', {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          onLoggedIn(data);
        })
        .catch(() => {
          console.log('no such user');
          alert(
            'Wrong Username or Password. If you are new here, please register first.'
          );
        });
    }
  };

  return (
    <Container className="login-container">
      <Row>
        <Col>
          <h3 className="login-title">Done coding for today?</h3>

          <p className="intro-text">
            Grab a beer and some popcorn
            <br /> and discover my selection
            <br /> of tech-industry movies.
          </p>
        </Col>
        <Col className="mt-1">
          <h3 className="login-title">Please Login</h3>
          <Form id="login-form">
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
              {usernameError && <p>{usernameError}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter Password"
                required
              />
              {passwordError && <p>{passwordError}</p>}
            </Form.Group>
            <Button
              className="submit-button"
              variant="outline-danger"
              as="input"
              type="submit"
              value="Login"
              onClick={handleSubmit}
            />
            &nbsp;
            <span>
              No&nbsp;account?&nbsp;No&nbsp;problem!&nbsp;
              <a className="link" href={'/register'}>
                Register&nbsp;here.
              </a>
            </span>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
};
export default connect(mapStateToProps, { setUser })(LoginView);
