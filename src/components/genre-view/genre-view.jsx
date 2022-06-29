import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './genre-view.scss';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

import { Accordion } from 'react-bootstrap';

function GenreView({ genre }) {
  console.log('Prop that is passed from MainView:', genre);

  const [genreObject, setGenreObject] = useState([]);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  const filterGenres = (genres, genreIds) => {
    let filteredGenres = [];
    genres.forEach((genre) => {
      genreIds.includes(genre._id) ? filteredGenres.push(genre) : null;
    });
    setGenreObject(filteredGenres);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`https://tech-and-popcorn.herokuapp.com/genres`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        filterGenres(response.data, genre);
      });
  }, []);

  return (
    <div>
      {genreObject &&
        genreObject.map((genreObject) => (
          <Accordion key={genreObject._id}>
            <Accordion.Item eventKey="0">
              <Accordion.Header variant="link" onClick={handleClick}>
                {genreObject.Name}{' '}
                {isCollapsed ? (
                  <BsFillArrowUpCircleFill />
                ) : (
                  <BsFillArrowDownCircleFill />
                )}
              </Accordion.Header>
              <Accordion.Body className="genre-text">
                {genreObject.Description}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
    </div>
  );
}

export default GenreView;
