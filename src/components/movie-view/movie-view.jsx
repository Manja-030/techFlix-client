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

  render() {
    const { genre, movie, onBackClick } = this.props;
    console.log(movie);
    console.log(movie.Genre);
    console.log(genre);
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
                {genre.map((genreId) => (
                  <GenreView key={genreId} />
                ))}
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
  /*MovieView.propTypes = {
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
};*/
}

export default MovieView;
