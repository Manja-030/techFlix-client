import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
	render() {
		const { movie } = this.props;
		return (
			<Card className="movieCard mb-2">
				<Card.Img className="movieCard-img" variant="top" src={movie.ImagePath} crossOrigin="true" />
				<Card.Body>
					<Card.Title className="cardTitle">{movie.Title}</Card.Title>
					<Card.Text className="cardText">{movie.Description.slice(0, 120)}</Card.Text>
					<Link to={`/movies/${movie._id}`}>
						<Button id="card-button" onClick={() => onMovieClick(movie)} variant="link">
							More Info
						</Button>
					</Link>
				</Card.Body>
			</Card>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		ImagePath: PropTypes.string.isRequired,
	}).isRequired,
	onMovieClick: PropTypes.func.isRequired,
};
