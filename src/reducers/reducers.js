import { SET_MOVIES, SET_FILTER, SET_USER } from '../actions/actions';
import { combineReducers } from 'redux';

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

function user(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

const movieApp = combineReducers({
  movies,
  visibilityFilter,
  user,
});

export default movieApp;
