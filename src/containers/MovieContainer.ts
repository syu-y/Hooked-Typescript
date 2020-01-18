import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { movieActions } from '../actions/movieActions';
import MovieSerch from '../components/MovieSearch';
import MovieItemList from '../components/MovieTypes';

export interface MovieActions {
  searchMovie: () => Action<void>;
  requestSuccess: (v: MovieItemList) => Action<MovieItemList>;
  requestFailure: (v: string | null) => Action<string | null>;
}


function mapDispatchToProps(dispatch: Dispatch<Action<void | (string | null )|  MovieItemList>>) {
  return {
    searchMovie: () => dispatch(movieActions.searchMovie()),
    requestSuccess: (v: MovieItemList) => dispatch(movieActions.requestSuccess(v)),
    requestFailure: (v: string | null) => dispatch(movieActions.requestFailure(v))
  };
}

function mapStateToProps(appState: AppState) {
  return Object.assign({}, appState.movie);
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSerch);
