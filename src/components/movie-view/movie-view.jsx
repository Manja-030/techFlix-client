import React from 'react';
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

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card className="movieView-card">
        <Card.Body>
          <Row>
            <Col>
              <h2 className="movie-title mb-5">{movie.Title}</h2>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6} lg={4}>
              <img
                className="movie-image"
                src={movie.ImagePath}
                alt={movie.Title}
                crossOrigin="true"
              />
            </Col>

            <Col md={6} lg={4} className="movie-details">
              {movie.Description}
            </Col>

            <Col md={6} lg={4} className="detail-links">
              <div>
                <div>Director: </div>
                <DirectorView movie={movie} />
              </div>
              <div>
                <div>Genre:</div>

                <div>
                  <GenreView genre={movie.Genre} />
                </div>
              </div>

              <div>Released: {movie.ReleaseYear}</div>
            </Col>
          </Row>

          <Row>
            <Col className="add-fav">
              <Button
                type="button"
                variant="outline-danger"
                onClick={() => this.handleAdd(movie)}
              >
                Add to Favorites <GiPopcorn className="fav-icon" />
              </Button>
            </Col>

            <Col>
              <Button
                variant="outline-danger"
                onClick={() => {
                  onBackClick(null);
                }}
              >
                Back
              </Button>{' '}
            </Col>
            <Col></Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

{
  MovieView.propTypes = {
    Movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ReleaseYear: PropTypes.string.isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string,
        Death: PropTypes.string,
      }).isRequired,
      Genre: PropTypes.array.isRequired,
    }),
    onBackClick: PropTypes.func.isRequired,
  };
}

export default MovieView;
