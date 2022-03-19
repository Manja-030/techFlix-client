import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './navigation.scss';
import { GiPopcorn } from 'react-icons/gi';

function Navigation({ logOut }) {
  const user = localStorage.getItem('user');

  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  const isAuth = () => {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  return (
    <Navbar
      id="main-nav"
      className="mb-5"
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
    >
      <Navbar.Brand id="appName" href="/">
        <GiPopcorn />
        techFlix
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        className="justify-content-end"
        id="responsive-navbar-nav"
      >
        <Nav>
          {isAuth() && (
            <Nav.Item>
              <Link
                to={`/users/${user}`}
                className="navbar-link text-decoration-none"
                as="div"
              >
                MyPage
              </Link>
            </Nav.Item>
          )}
          {isAuth() && (
            <Nav.Item>
              <Link
                to="/"
                className="navbar-link text-decoration-none"
                as="div"
                onClick={logOut}
              >
                LogOut
              </Link>
            </Nav.Item>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
