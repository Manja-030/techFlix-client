/* // ACTIONS // */

/* Movies */

export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

/* Users */

export const SET_USER = 'SET_USER';

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
