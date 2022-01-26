import React, { useState } from 'react';
import './genre-view.scss';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

import { Accordion, Button } from 'react-bootstrap';

function GenreView({ genre }) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const handleClick = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<Accordion>
			<Accordion.Item eventKey="0">
				<Accordion.Header as={Button} variant="link" onClick={handleClick}>
					{genre.Name} {isCollapsed ? <BsFillArrowUpCircleFill /> : <BsFillArrowDownCircleFill />}
				</Accordion.Header>
				<Accordion.Body>{genre.Description}</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
}

export default GenreView;
