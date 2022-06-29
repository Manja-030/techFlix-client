# MyFlix Application


https://user-images.githubusercontent.com/80778632/176513127-92ba26b0-32af-4f44-ae7f-744574b598b0.mov



This is the client side application for this [API](https://github.com/Manja-030/movie-app). It showcases several movies. The user can get information about each movie and add movies to a list of favorites.

<img width="1427" alt="image" src="https://user-images.githubusercontent.com/80778632/166975245-0a2d86cc-c3e1-4867-ac03-a783f83f85e3.png">

## Key Features

### Main view

Returns a list of ALL movies to the user (each listed item with an image, title, and description).
User can select a movie for more details.

### Single movie view

Returns data (description, genre, director, image, release year) about a single movie to the user.
Allows user to add a movie to her list of favorites.

### Login view

Allows user to log in with a username and password.

### Registration view

Allows new user to register (username, password, email, birthday).

### Genre view

Returns data about a genre, with a name and description.

### Director view

Returns data about a director (name, bio).

### Profile view

Allows user to update user info (username, password, email, date of birth).
Allows users to deregister (delete profile).
Displays favorite movies.
Allows user to remove a movie from list of favorite movies.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have node installed and a package manager like npm.

### Installing

Clone project by navigation to the directory where you would like to clone the project.

```
git clone https://github.com/Manja-030/techFlix-client.git
```

Then install all dependencies running

```
npm install
```

To build the app run

```
npm start
```

## Build Process

The build is done with [Parcel version 2.0.0-rc.0](https://www.npmjs.com/package/parcel/v/2.0.0-rc.0)

## Live Demo

https://techflix.netlify.app/
