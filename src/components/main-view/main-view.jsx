import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Navbar, Nav, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { GiPopcorn } from 'react-icons/gi';
import './main-view.scss';

import Navigation from '../navigation/navigation.jsx';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			user: null,
		};
	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user'),
			});
			this.getMovies(accessToken);
		}
	}

	/*When a movie is clicked, this function is called and updates the state of the `selectedMovie` property to that movie*/
	setSelectedMovie(newSelectedMovie) {
		this.setState({
			selectedMovie: newSelectedMovie,
		});
	}

	/* When a user successfully logs in, this function updates the `user` property in state to that user*/

	onLoggedIn(authData) {
		console.log(authData);
		this.setState({
			user: authData.user.Username,
		});

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
	}

	onLoggedOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({
			user: null,
		});
	}

	onRegistered(user) {
		this.setState({
			user,
		});
	}

	getMovies(token) {
		axios
			.get('https://tech-and-popcorn.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// Assign the result to the state
				this.setState({
					movies: response.data,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	render() {
		const { movies, user } = this.state;
		if (!user)
			return (
				<Row>
					<Col>
						<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
					</Col>
				</Row>
			);
		if (movies.length === 0) return <div className="main-view" />;

		return (
			<Router>
				<Navigation />
				<Container>
					{/*<Navbar className="mb-5" id="techFlixNav" bg="dark" variant="dark" expand="lg" sticky="top">
						<Navbar.Brand id="appName" href="#home">
							<GiPopcorn />
							techFlix
						</Navbar.Brand>
						<Navbar.Toggle className="toggle" />
						<Navbar.Collapse className="justify-content-end toggle">
							<Nav.Link id="link" href="">
								MyPage
							</Nav.Link>
							<Nav.Link id="link" href="">
								Movies
							</Nav.Link>
							<Nav.Link id="link" href="">
								<Button variant="outline-danger" onClick={() => this.onLoggedOut()}>
									LogOut
								</Button>
							</Nav.Link>
						</Navbar.Collapse>
					</Navbar>*/}
					<Row className="main-view justify-content-md-center">
						<Route
							exact
							path="/"
							render={() => {
								return movies.map((m) => (
									<Col md={3} key={m._id}>
										<MovieCard movie={m} />
									</Col>
								));
							}}
						/>
						<Route
							exact
							path="/movies/:movieID"
							render={({ match, history }) => {
								return (
									<Col md={8}>
										<MovieView
											movie={movies.find((m) => m._id === match.params.movieID)}
											onBackClick={() => history.goBack()}
										/>
									</Col>
								);
							}}
						/>
						<Route
							exact
							path="director/:Name"
							render={({ match }) => {
								if (movies.length === 0) return <div className="main-view" />;
								return (
									<Col md={8}>
										<DirectorView
											director={
												movies.find((m) => m.Director.Name === match.params.name).Director
											}
										/>
									</Col>
								);
							}}
						/>
						<Route
							exact
							path="genres/:Name"
							render={({ match }) => {
								if (movies.length === 0) return <div className="main-view" />;
								return (
									<Col md={8}>
										<DirectorView
											director={
												movies.find((m) => m.Director.Name === match.params.name).Director
											}
										/>
									</Col>
								);
							}}
						/>
					</Row>
				</Container>
			</Router>
		);
	}
}

export default MainView;
