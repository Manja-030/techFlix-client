/* // ACTIONS // */

/* Movies */

export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

/* Users */

export const SET_USER = 'SET_USER';

export const VALIDATE_INPUT = 'VALIDATE_INPUT';

export const CHANGE_FAVORITES = 'CHANGE_FAVORITES';

/* // ACTION CREATORS // */

/* Movies */

export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value,
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value,
  };
}

/* USERS */

export function setUser(value) {
  return {
    type: SET_USER,
    value,
  };
}

export function validateInput(
  value = { Username: '', Email: '', Password: '', Birthday: '' },
  field = null
) {
  return {
    type: VALIDATE_INPUT,
    value,
    field,
  };
}

export function changeFavorites(value, field = 'FavMovies') {
  return {
    type: CHANGE_FAVORITES,
    value,
    field,
  };
}
