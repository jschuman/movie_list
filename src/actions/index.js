import axios from 'axios'

const ROOT_URL = 'http://www.omdbapi.com/?';

export const SEARCH_MOVIES = 'SEARCH_MOVIES';
export const FETCH_MOVIE = 'FETCH_MOVIE';
export const SORT_MOVIES = 'SORT_MOVIES';

export function searchMovies(title){
  const url = `${ROOT_URL}s=${title}`;
  const request = axios.get(url);

  return {
    type: SEARCH_MOVIES,
    payload: request
  }
}

export function fetchMovie(imdbID){
  const url = `${ROOT_URL}i=${imdbID}`;
  const request = axios.get(url);

  return {
    type: FETCH_MOVIE,
    payload: request
  }
}

export function sortMovies(key){
  return {
    type: SORT_MOVIES,
    payload: key
  }
}
