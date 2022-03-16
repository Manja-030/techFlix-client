import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import MovieCard from '../movie-card/movie-card';

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return filteredMovies.map((movie) => (
    <Col md={3} key={movie._id}>
      <MovieCard movie={movie} />{' '}
    </Col>
  ));
}

export default connect(mapStateToProps)(MoviesList);
