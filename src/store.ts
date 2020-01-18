import { createStore, combineReducers } from 'redux';
import { movieReducer, MovieState } from './states/MovieState';

export type AppState = {
  movie: MovieState
};

const store = createStore(
  combineReducers<AppState>({
    movie: movieReducer
  })
);

export default store;
