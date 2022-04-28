import React, { useEffect } from 'react';
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

function MovieView({ user, movie, onBackClick, changeFavorites }) {
  const token = localStorage.getItem('token');
  const localUser = localStorage.getItem('user');
  const handleFavorites = () => {
    user.FavMovies.includes(movie._id)
      ? axios
          .delete(
            `https://tech-and-popcorn.herokuapp.com/users/${localUser}/movies/${movie._id}`,
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
            changeFavorites(response.data.FavMovies);
          })
          .catch(function (error) {
            console.log(error);
          });
  };

  useEffect(() => {
    document.body.className = 'background-color';
  }, []);

  return (
    <Card className="movieView-card">
      <Card.Body>
        <Row>
          <Col>
            <h2 className="movie-title mb-3">{movie.Title}</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Row>
              <img
                className="movie-image"
                src={movie.ImagePath}
                alt={movie.Title}
                crossOrigin="true"
              />
            </Row>
          </Col>

          <Col className="detail-links">
            <div className="mb-4">Released: {movie.ReleaseYear}</div>
            <div className="mb-4">
              <div>Director: </div>
              <DirectorView movie={movie} />
            </div>
            <div>
              <div>Genre:</div>

              <div>
                <GenreView genre={movie.Genre} />
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="movie-details">{movie.Description}</Col>
        </Row>

        <Row>
          <Col className="add-fav text-left">
            {' '}
            <div>
              {user.FavMovies.includes(movie._id) ? (
                <>
                  <Button
                    onClick={handleFavorites}
                    variant="outline-danger"
                    className="text-left button"
                  >
                    <GiPopcorn className="fav-icon-button" />
                    <span className="button-text"> Remove from List</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleFavorites} variant="outline-danger">
                    <GiPopcorn className="fav-icon-button" />
                    <span> Add to Favorites</span>
                  </Button>
                </>
              )}
            </div>
          </Col>

          <Col className="text-right">
            <Button
              variant="outline-danger"
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>{' '}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
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
      _id: PropTypes.string.isRequired,
    }),
    onBackClick: PropTypes.func.isRequired,
  };
}

export default connect(mapStateToProps, { changeFavorites })(MovieView);
