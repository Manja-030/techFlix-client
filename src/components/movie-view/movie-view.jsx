import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} crossOrigin="true"></img>
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

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
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
