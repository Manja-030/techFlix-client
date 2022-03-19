import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import './movie-card.scss';

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <Card className="movieCard mb-2">
        <Card.Img
          className="movieCard-img"
          variant="top"
          src={movie.ImagePath}
          alt={movie.title}
          crossOrigin="true"
        />
        <Card.Body className="movieCard-body">
          <Card.Title className="cardTitle">{movie.Title}</Card.Title>
          <Card.Text className="cardText">{movie.Description}</Card.Text>
        </Card.Body>
        <Card.Footer className="movieCard-footer">
          <Link to={`/movies/${movie._id}`} id="button-link">
            <Button id="card-button" variant="link">
              More Info
            </Button>
          </Link>
        </Card.Footer>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.string.isRequired,
    Genre: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }),
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
