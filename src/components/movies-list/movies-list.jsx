import React, { useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import MovieCard from '../movie-card/movie-card';
import './movies-list.scss';

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

  const [visible, setVisible] = useState(4);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Container className="search-bar-container">
        <Col className="search-bar">
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
      </Container>

      {filteredMovies.slice(0, visible).map((movie) => (
        <Col
          xs={12}
          sm={12}
          md={6}
          lg={3}
          key={movie._id}
          className="movie-cards"
        >
          <MovieCard movie={movie} />
        </Col>
      ))}
      <button onClick={showMoreItems}>Load more movies</button>
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);
