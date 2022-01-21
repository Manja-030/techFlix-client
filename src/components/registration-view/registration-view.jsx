import React, { useState } from 'react';
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
import axios from 'axios';

function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [birthdayError, setBirthdayError] = useState("");

  const validate = () => {
    let isReq = true;
    if (!username){
      setUsernameError("Username is required.");
      isReq = false;
    }
    else if(username.length < 4){
      setUsernameError("Username must be at least 4 characters long.")
      isReq = false;
    }
    
    if(!password){
      setPasswordError("Password is required.");
      isReq = false;
    }
    else if(password.length < 6){
      setPasswordError("Password must be at least 6 characters long.");
      isReq = false;
    }
    return isReq;

    if(!email){
      setEmailError("Email is required.");
      isReq = false;
    }
    else if(email.indexOf("@") === -1){
      setEmailError("Email is not valid.");
      isReq = false;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    const isReq = validate();
    if(isReq){
      axios.post("https://tech-and-popcorn.herokuapp.com/users",{
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert("Registration successful. You can login now!");
        window.open("/", "_self");
      })
      .catch(response => {
        console.error(response);
        alert("Unable to register.");
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Register</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter a username"
                    />
                    {usernameError && <p> usernameError</p>}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                    />
                    {passwordError && <p> passwordError</p>}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                    />
                    {emailError && <p> emailError</p>}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                  </Form.Group>

                  <Button type="Submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
};

export default RegistrationView;
