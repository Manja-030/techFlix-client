import React from 'react';
<<<<<<< Updated upstream
=======
import axios from 'axios';
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
      movie: {},
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getMovie(accessToken);
  }
  /*
  handleAdd() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios
      .post(
        `https://tech-and-popcorn.herokuapp.com/users/${user}` +
          '/favorites/' +
          this.props.movie._id,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert(
          this.props.movie.Title + ' has been added to your Favorites List.'
        );
        this.props.setUser(response.data);
        alert('HELLO');
      });
  }
  */
  getMovie(token) {
    const { movieId } = this.props;
    axios
      .get('http://localhost:8080/movies' + movieId, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log('Axios:', response.data);
        // Assign the result to the state
        this.setState({
          movie: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
>>>>>>> Stashed changes

export class MovieView extends React.Component {
  render() {
<<<<<<< Updated upstream
    const { movie, onBackClick } = this.props;
=======
    const { movie } = this.state;
>>>>>>> Stashed changes
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
