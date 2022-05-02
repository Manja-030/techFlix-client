import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
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

  useEffect(() => {
    document.body.className = 'background-color';
  }, []);

  return (
    <>
      <Container className="search-bar-container">
        <Row>
          <Col className="search-bar">
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
          </Col>
        </Row>
        <Row>
          {filteredMovies.slice(0, visible).map((movie) => {
            return (
              <Col
                xs={12}
                sm={12}
                md={6}
                lg={3}
                key={movie._id}
                className="movie-cards"
              >
                <MovieCard className="mb-3" movie={movie} />
              </Col>
            );
          })}
        </Row>
        <Row>
          <Button
            id="load-button"
            variant="outline-danger"
            onClick={showMoreItems}
          >
            Load more movies
          </Button>
        </Row>
      </Container>
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);
