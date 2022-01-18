import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardBody, Row, Col } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <>
        <Row>
          <Col>
            <h2 className="movie-title mb-5">{movie.Title}</h2>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6} lg={4}>
            <img
              className="movie-view"
              src={movie.ImagePath}
              alt={movie.Title}
              crossOrigin="true"
            />
          </Col>
          <Col md={6} lg={4} className="movie-details">
            {movie.Description}
          </Col>
          <Col md={6} lg={4} className="detail-links">
            <p>Director: </p>
            <p>Genre:</p>
            <p>Released: {movie.ReleaseYear}</p>
          </Col>
        </Row>
        <Row>
          <Col className="add-fav">Add to Favorites</Col>
          <Col>
            <button
              className="back-button"
              onClick={() => {
                onBackClick(null);
              }}
            >
              BACK
            </button>
          </Col>
        </Row>
      </>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
