import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { changeFavorites } from '../../actions/actions';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import './movie-view.scss';
import { GiPopcorn } from 'react-icons/gi';
import { render } from 'react-dom';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

function MovieView({ user, movie, onBackClick, changeFavorites }) {
  const handleFavorites = () => {
    let token = localStorage.getItem('token');
    let localUser = localStorage.getItem('user');

    user.FavMovies.includes(movie._id)
      ? axios
          .delete(
            `https://tech-and-popcorn.herokuapp.com/users/${localUser}/movies/${movie._id}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((response) => {
            changeFavorites(response.data.FavMovies);
          })
          .catch((error) => {
            console.log(error);
          })
      : axios
          .post(
            `https://tech-and-popcorn.herokuapp.com/users/${localUser}/movies/${movie._id}`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            alert('Movie as been added to Favorites.');
            changeFavorites(response.data.FavMovies);
          })
          .catch(function (error) {
            console.log(error);
          });
  };

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
            <Button variant="outline-danger" onClick={handleFavorites}>
              {user.FavMovies.includes(movie._id) ? (
                <>
                  <GiPopcorn className="fav-icon" />
                  <span className="d-inline-block"> Remove from Favorites</span>
                </>
              ) : (
                <>
                  <GiPopcorn className="fav-icon" />
                  <span> Add to Favorites</span>
                </>
              )}
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
/*
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
      _id: PropTypes.string.isRequired,
    }),
    onBackClick: PropTypes.func.isRequired,
  };
}*/

export default connect(mapStateToProps, { changeFavorites })(MovieView);
