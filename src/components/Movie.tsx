import React from 'react';
import { MovieItem }from './MovieTypes';

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


type Props = {
  movie: MovieItem
};

const Movie: React.FC<Props> = (props) => {
  const poster = props.movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : props.movie.Poster;
  return (
    <div className="movie" id={props.movie.imdbID}>
      <h2>{props.movie.Title}</h2>
      <div>
        <img src={poster} alt={`The movie titled: ${props.movie.Title}`} width="200"/>
      </div>
      <p>({props.movie.Year})</p>
      <p>({props.movie.Type})</p>
    </div>
  );
};

export default Movie;
