import actionCreatorFactory from 'typescript-fsa';
import { REQUEST, SUCCESS, FAILURE } from './ActionTypes';
import MovieItemList from '../components/MovieTypes';

const actionCreator = actionCreatorFactory();

export const movieActions = {
  searchMovie: actionCreator(REQUEST),
  requestSuccess: actionCreator<MovieItemList>(SUCCESS),
  requestFailure: actionCreator<string | null>(FAILURE)
};
