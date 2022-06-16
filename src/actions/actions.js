//In the file itself, you’re explicitly naming your potential actions

export const SET_MOVIES = 'SET_MOVIES'; //initializes the movies list with movies
export const SET_FILTER = 'SET_FILTER'; // sets the filter to filter your movies list

export const SET_USER = 'SET_USER';

//The reason for exporting functions is convenience: you’ll be able to call them from wherever you want to perform said actions. Think of these functions like event constructors: you’ll call them from a view to formally express the change you want to perform on the application’s state.
export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUser(value) {
  return { type: SET_USER, value };
}