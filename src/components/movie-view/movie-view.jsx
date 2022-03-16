import React from 'react';
<<<<<<< Updated upstream
=======
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardBody, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import './movie-view.scss';
import { GiPopcorn } from 'react-icons/gi';

class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FavMovies: [],
      userDetails: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUserDetails(accessToken);
  }

  getUserDetails(token) {
    axios
      .get(`https://tech-and-popcorn.herokuapp.com/users/${this.props.user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Use the response to set the user details in the state variables
        this.setState({
          userDetails: response.data,
          FavMovies: response.data.FavMovies,
        });
        console.log('Response.Data userDetails:', response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // add movieID to user's FavMovies array:
  handleAdd() {
    let token = localStorage.getItem('token');

    axios
      .post(
        `https://tech-and-popcorn.herokuapp.com/users/${this.props.user}/movies/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert('Movie as been added to Favorites.');
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
>>>>>>> Stashed changes

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath}></img>
        </div>
        <div className="movie-title">
          <span className="label">Title:</span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description:</span>
          <span className="value">{movie.Description}</span>
        </div>
        <button
          onClick={() => {
            onBackClick(null);
          }}
        >
          BACK
        </button>
      </div>
    );
  }
}
