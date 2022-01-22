import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import './login-view.scss';

function LoginView(props) {
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
			setUsernameError('Password is required.');
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
					props.onLoggedIn(data);
				})
				.catch((e) => {
					console.log('no such user');
					alert('Wrong Username or Password. If you are new here, please register first.');
				});
		}
	};

	return (
		<Container className="login-container">
			<Row>
				<Col>
					<CardGroup>
						<Card>
							<Card.Body className="card-body">
								<Card.Title>Please Login</Card.Title>
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
										className="login-button"
										variant="outline-danger"
										as="input"
										type="submit"
										value="Submit"
										onClick={handleSubmit}
									/>{' '}
									No account? No problem! Register{' '}
									<a className="link" href="">
										here
									</a>
								</Form>
							</Card.Body>
						</Card>
					</CardGroup>
				</Col>
			</Row>
		</Container>
	);
}

LoginView.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired,
	}),
};
export default LoginView;
