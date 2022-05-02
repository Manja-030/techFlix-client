import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { changeFavorites } from '../../actions/actions';
import PropTypes from 'prop-types';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
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
    <>
      <Container className="movieView-card mb-3">
        <Row>
          <Col md="auto">
            <img
              variant="top"
              className="movie-image mb-2"
              src={movie.ImagePath}
              alt={movie.Title}
              crossOrigin="true"
            />
            <div className="add-fav">
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
          <Col md={8}>
            <Row>
              <Col className="movie-title mb-3">
                {movie.Title}({movie.ReleaseYear})
              </Col>
            </Row>
            <Row>
              <Col className="movie-details mb-3">{movie.Description}</Col>
            </Row>
            <Row className="detail-links">
              <Col>
                <div>Director: </div>
                <DirectorView movie={movie} />
              </Col>
              <Col>
                {' '}
                <div>Genre:</div>
                <div>
                  <GenreView genre={movie.Genre} />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
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
      </Container>
    </>
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
