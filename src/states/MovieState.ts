
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { movieActions } from '../actions/movieActions';
import MovieItemList from '../components/MovieTypes';

export interface MovieState {
  loading: boolean,
  movies: MovieItemList,
  errorMessage: string | null
}

export const initialState: MovieState = {
  loading: true,
  movies: [],
  errorMessage: null
};

export const movieReducer = reducerWithInitialState(initialState)
  .case(movieActions.searchMovie, (state) => {
    return Object.assign({}, state, {
      loading: true,
      errorMessage: null
    });
  })
  .case(movieActions.requestSuccess, (state, movies) => {
    return Object.assign({}, state, {
      loading: false,
      movies: movies,
      errorMessage: null
    });
  })
  .case(movieActions.requestFailure, (state, errorMessage) => {
    return Object.assign({}, state, {
      loading: false,
      errorMessage: errorMessage
    });
  })
