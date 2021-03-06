import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap';

import { setUser, validateInput } from '../../actions/actions';
import { connect } from 'react-redux';

import './login-view.scss';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

function LoginView({ user, setUser, validateInput, onLoggedIn }) {
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    setUser({ Username: '', Password: '' });
  }, []);

  useEffect(() => {
    document.body.className = 'background-image';
  }, []);

  const validate = (statusCode = 200) => {
    let isValid = true;
    if (!user.Username) {
      setUsernameError('Username is required.');
      isValid = false;
    }
    if (!user.Password) {
      setPasswordError('Password is required.');
      isValid = false;
    }

    if (statusCode === 400) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      axios
        .post(
          `https://tech-and-popcorn.herokuapp.com/login?Username=${user.Username}&Password=${user.Password}`
        )

        .then((response) => {
          onLoggedIn(response.data);
        })
        .catch((e) => {
          validate(e.response.status);
          alert(
            'Wrong Username or Password. If you are new here, please register first.'
          );
        });
    }
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} sm={12} md={8} lg={8} xl={6}>
        <Card className="login-card">
          <Card.Header className="text-center login-header">
            Done coding for today?
          </Card.Header>
          <Card.Body>
            <p className="intro-text">
              Grab a beer and some popcorn and discover my selection of
              tech-industry movies.
              <hr className="divider" />
            </p>
            <p className="intro-text login-request">Please log in:</p>
            <Form>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => validateInput(e.target.value, 'Username')}
                  required
                />
                {usernameError && <p>{usernameError}</p>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => {
                    validateInput(e.target.value, 'Password');
                  }}
                  required
                />
                {passwordError && <p>{passwordError}</p>}
              </Form.Group>
              <Button
                className="login-button"
                variant="outline-danger"
                as="input"
                type="submit"
                value="Login"
                onClick={handleSubmit}
              />
              &nbsp;
              <div className="reg-request">
                No&nbsp;account?&nbsp;No&nbsp;problem!&nbsp;
                <br />
                <a className="link" href={'/register'}>
                  Register&nbsp;here.
                </a>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func,
  validateInput: PropTypes.func,
  setUser: PropTypes.func,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
};
export default connect(mapStateToProps, { setUser, validateInput })(LoginView);
