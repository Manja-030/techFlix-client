import React, { useState } from 'react';
import './director-view.scss';

import { Accordion, Card, Button } from 'react-bootstrap';

function DirectorView({ movie }) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const handleOnClick = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<div className="App">
			<Accordion defaultActiveKey="0">
				<Card>
					<Card.Header>
						<Accordion.Toggle
							as={Button}
							variant="link"
							eventKey="0"
							className="p-0"
							onClick={handleOnClick}
						>
							{movie.Director.Name}
						</Accordion.Toggle>
					</Card.Header>

					<Accordion.Collapse eventKey="0">
						<Card.Body>movie.Director.Bio</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</div>
	);
}

export default DirectorView;
