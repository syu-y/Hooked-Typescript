import React, { useState, useEffect } from 'react';
import "../App.css";
import Header from './Header';
import Movie from './Movie';
import Search from './Search';
import MovieItemList from './MovieTypes';
import fetcher from '../utils/fetcher';
import config from '../config'

const MOVIE_API_URL = "https://www.omdbapi.com/?s=iron&apikey=" + config.apiKey;

type ResponseType = {
  Search: MovieItemList
  totalResults: number
  Response: string
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<MovieItemList>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {

    fetcher<ResponseType>(
      MOVIE_API_URL,
      {
        headers: { }
      }
    )
    .then(items => {
      if(items.Search){
        setMovies(items.Search);
        console.log(items.Search);
      } else {
        setErrorMessage("Not Found!")
        setMovies([]);
      }
      setLoading(false)
    })
    .catch(err => {
      setErrorMessage(err)
      console.log(err)
    })
    }, []);

    const search = (searchValue: string) => {
      setLoading(true);
      setErrorMessage(null);
      console.log(searchValue);
      fetcher<ResponseType>(
        `https://www.omdbapi.com/?s=${searchValue}&apikey=3dd9326`,
        {
          headers: { }
        }
        )
        .then(items => {
          if(items.Search){
            setMovies(items.Search);
            console.log(items.Search);
          } else {
            setErrorMessage("Not Found!")
            setMovies([]);
          }
          setLoading(false)
    })
    .catch(err => {
      setErrorMessage(err)
      console.log(err)
    })
  }

  return (
    <div className="App">
      <Header text="HOOKED"/>
      <Search search={search}/>
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        { loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie}/>
          ))
        )
      }
      </div>
    </div>
  );
}

export default App;
