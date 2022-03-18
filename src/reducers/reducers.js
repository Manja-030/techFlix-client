import { SET_MOVIES, SET_FILTER, SET_USER } from '../actions/actions';
import { combineReducers } from 'redux';

/* Movies */

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

/* Users */

function user(
  state = {
    Username: '',
    Email: '',
    Password: '',
    Birthday: '',
    FavMovies: [],
  },
  action
) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

/* Combine */

const movieApp = combineReducers({
  movies,
  visibilityFilter,
  user,
});

export default movieApp;
