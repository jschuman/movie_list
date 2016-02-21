import { SORT_MOVIES } from '../actions/index';

export default function(state = {key: 'Year', order: 'asc'}, action){
  switch (action.type) {
    case SORT_MOVIES:
      if (state.key === action.payload){
        return {key: state.key, order: state.order === 'asc' ? 'desc' : 'asc'};
      } else {
        return {key: action.payload, order: 'asc'};
      }
  }
  return state;
}
