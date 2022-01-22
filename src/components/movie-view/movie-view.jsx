import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardBody, Row, Col, Button } from 'react-bootstrap';

import './movie-view.scss';
import { GiPopcorn } from 'react-icons/gi';

class MovieView extends React.Component {
	render() {
		const { movie, onBackClick } = this.props;
		return (
			<>
				<Row>
					<Col>
						<h2 className="movie-title mb-5">{movie.Title}</h2>
					</Col>
				</Row>
				<Row className="mb-4">
					<Col md={6} lg={4}>
						<img className="movie-view" src={movie.ImagePath} alt={movie.Title} crossOrigin="true" />
					</Col>
					<Col md={6} lg={4} className="movie-details">
						{movie.Description}
					</Col>
					<Col md={6} lg={4} className="detail-links">
						<div>Director: </div>
						<Link to={`/director/${movie.Director.Name}`}>
							<Button variant="link">{director.Name}</Button>
						</Link>

						<div>Genre:</div>
						<Link to={`/genres/${movie.Genre.name}`}>
							<Button variant="link">{genre.Name}</Button>
						</Link>

						<div>Released: {movie.ReleaseYear}</div>
					</Col>
				</Row>
				<Row>
					<Col className="add-fav">
						Add to Favorites <GiPopcorn className="fav-icon" />
					</Col>
					<Col>
						<Button
							variant="outline-danger"
							onClick={() => {
								onBackClick(null);
							}}
						>
							Back
						</Button>{' '}
					</Col>
				</Row>
			</>
		);
	}
}

MovieView.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		ImagePath: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		ReleaseYear: PropTypes.string.isRequired,
		Director: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Bio: PropTypes.string.isRequired,
			Birth: PropTypes.string,
			Death: PropTypes.string,
		}).isRequired,
		Genre: PropTypes.array.isRequired,
	}).isRequired,
	onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
