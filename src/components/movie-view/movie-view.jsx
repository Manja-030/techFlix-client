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
  }

  // add movieID to user's FavMovies array:
  // this is the endpoint in my backend: '/users/:Username/movies/:MovieID'
  handleAdd() {
    alert('I will add this function in Task 3.8.');
  }

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
        </Row>
      </>
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
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
  };
}

export default MovieView;
