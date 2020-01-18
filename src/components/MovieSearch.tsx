import React, { useReducer, useState, useEffect } from 'react';
import "../App.css";
import Header from './Header';
import Movie from './Movie';
import Search from './Search';
import MovieItemList from './MovieTypes';
import fetcher from '../utils/fetcher';
import config from '../config'
import { MovieState } from '../states/MovieState';
import { MovieActions } from '../containers/MovieContainer';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=iron&apikey=" + config.apiKey;

type ResponseType = {
  Search: MovieItemList
  totalResults: number
  Response: string
}

type AppProps = MovieState & MovieActions;

const MovieSerch: React.FC<AppProps> = (props: AppProps) => {
  const NotFoundMessage = "Not Found!" as const;

  useEffect(() => {

    fetcher<ResponseType>(
      MOVIE_API_URL,
      {
        headers: { }
      }
    )
    .then(items => {
      if(items.Search){
        props.requestSuccess(items.Search);
      } else {
        props.requestFailure(NotFoundMessage);
      }
    })
    .catch(err => {
      props.requestFailure(err);
    })
  }, []);

  const search = (searchValue: string) => {
    props.searchMovie();

    fetcher<ResponseType>(
      `https://www.omdbapi.com/?s=${searchValue}&apikey=${config.apiKey}`,
      {
        headers: { }
      }
      )
      .then(items => {
        if(items.Search){
          props.requestSuccess(items.Search);
        } else {
          props.requestFailure(NotFoundMessage);
        }
      })
      .catch(err => {
        props.requestFailure(err);
      })
  }

  return (
    <div className="MovieSearch">
      <Header text="HOOKED"/>
      <Search search={search}/>
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        { props.loading && !props.errorMessage ? (
          <span>loading...</span>
        ) : props.errorMessage ? (
          <div className="errorMessage">{props.errorMessage}</div>
        ) : (
          props.movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie}/>
          ))
        )
      }
      </div>
    </div>
  );
}

export default MovieSerch;
