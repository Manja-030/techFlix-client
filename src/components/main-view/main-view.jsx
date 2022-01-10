import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: 'Tron',
          Description:
            'Tron is a cult movie for programmers. Jeff Bridges plays the programmer and video game developer  Kevin Flynn who gets sucked into the virtual world of computers. He uses some amazing coding skills to find his way back into the normal world.',
          ImagePath: '../img/tron_poster.jpeg',
        },
        {
          _id: 2,
          Title: 'Hackers',
          Description:
            'This crime story is starring Angelina Jolie in her first leading role in a major film. It follows a group of high school students who use their programming skills for corporate extortion.',
          ImagePath:
            'https://upload.wikimedia.org/wikipedia/en/6/67/Hackersposter.jpg',
        },
        {
          _id: 3,
          Title: 'The Pirates of Silicon Valley',
          Description:
            'This is a must watch movie for everyone who wants to know how personal computers came into the world. The biographical drama tells how Steve Jobs and Bill Gates came up with the idea of creating a computer that could be used by everyone and shows the methodologies they used. It also explores the impact that the rivalry between Jobs and Gates had on the development of the personal computer.',
          ImagePath: '../img/pirates_of_silicon_valley.jpeg',
        },
      ],
      selectedMovie: null,
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}

export default MainView;
