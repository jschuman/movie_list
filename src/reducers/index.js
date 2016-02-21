import { combineReducers } from 'redux';
import MoviesReducer from './reducer_movies';
import SortReducer from './reducer_sort';

const rootReducer = combineReducers({
  movies: MoviesReducer,
  sort: SortReducer
});

export default rootReducer;
