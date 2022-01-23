import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import './navigation.scss';
import { GiPopcorn } from 'react-icons/gi';

function Navigation({ user }) {
	const OnLoggedOut = () => {
		localStorage.clear();
		window.open('/', '_self');
	};

	const isAuth = () => {
		if (typeof window == 'undefined') {
			return false;
		}
		if (localStorage.getItem('token')) {
			return localStorage.getItem('token');
		} else {
			return false;
		}
	};

	return (
		<Navbar className="mb-5 main-nav" bg="dark" variant="dark" expand="lg" sticky="top">
			{/*<Container>*/}
			<Navbar.Brand className="appName" href="/">
				<GiPopcorn />
				techFlix
			</Navbar.Brand>

			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
				<Nav>
					{isAuth() && <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}
					{isAuth() && (
						<Button
							variant="link"
							onClick={() => {
								this.onLoggedOut();
							}}
						>
							LogOut
						</Button>
					)}
					{!isAuth() && <Nav.Link href={`/`}>LogIn</Nav.Link>}
					{!isAuth() && <Nav.Link href={`/register`}>Register</Nav.Link>}

					{/*


						<Nav.Link id="link" href="">
							MyPage
						</Nav.Link>
						
            <Nav.Link id="link" href="">
							Movies
						</Nav.Link>
					
          	<Nav.Link id="link" href="">
							<Button variant="outline-danger" onClick={() => this.onLoggedIn()}>
								LogIn
							</Button>
						</Nav.Link>
						
            <Nav.Link id="link" href="">
							<Button variant="outline-danger" onClick={() => this.onLoggedOut()}>
								LogOut
							</Button>
						</Nav.Link>*/}
				</Nav>
			</Navbar.Collapse>
			{/*</Container>*/}
		</Navbar>
	);
}

export default Navigation;
