import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './genre-view.scss';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

import { Accordion } from 'react-bootstrap';

function GenreView({ genre }) {
  console.log(genre);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  /*
	Ich nehme Genre Array
	für jedes Element -genreID- in diesem Array
	finde in response.data das Objekt mit der entsprechenden ID
	*/

  genre.forEach(function (genreId) {
    console.log(genreId);
    let url = 'https://tech-and-popcorn.herokuapp.com/genres/' + genreId;
    axios.get(url).then((response) => {
      console.log(response.data);
      let genreObject = response.data;
      return genreObject;
    });
  });

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
        <Accordion.Body>{genreObject.Description}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default GenreView;
