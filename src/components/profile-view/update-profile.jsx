import React from 'react';

function UpdateProfile() {
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

export default UpdateProfile;
