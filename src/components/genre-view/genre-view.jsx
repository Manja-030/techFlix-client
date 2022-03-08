import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './genre-view.scss';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

import { Accordion } from 'react-bootstrap';

/*I guess I have to add a state to make it work?*/

function GenreView({ genre }) {
  console.log(genre);

  const [genreObject, setGenreObject] = useState({});

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  /*
	I take the genre array. 
  For every element in this array (every genreId) I find in response.data the object 
  that has the matching Id.
	*/

  useEffect(() => {
    genre.forEach(function (genreId) {
      console.log(genreId);
      const token = localStorage.getItem('token');
      let url = 'https://tech-and-popcorn.herokuapp.com/genres/' + genreId;
      axios
        .get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setGenreObject(response.data);
          console.log(response.data);
          console.log(genreObject);
        });
    });
  }, []);

  return (
    <Accordion>
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
  );
}

export default GenreView;
