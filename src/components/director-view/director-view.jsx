import React, { useState } from 'react';
import './director-view.scss';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

import { Accordion } from 'react-bootstrap';

function DirectorView({ movie }) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const handleClick = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<Accordion>
			<Accordion.Item eventKey="0">
				<Accordion.Header className="accordion-header" as={Button} variant="link" onClick={handleClick}>
					{movie.Director.Name} {isCollapsed ? <BsFillArrowUpCircleFill /> : <BsFillArrowDownCircleFill />}
				</Accordion.Header>
				<Accordion.Body>{movie.Director.Bio}</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
}

export default DirectorView;
