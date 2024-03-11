import React from "react";
import { Link } from "react-router-dom";
import { searchMovieType } from "../global.t";

const MovieCard = ({ movie, index }: { movie: searchMovieType; index: number }) => {
  return (
    <div
      key={index}
      className="border rounded p-1 text-center max-w-[min-content]"
    >
      <Link to={`/movie/${movie.imdbID || movie.imdb_id}`}>
        <img src={movie.Poster || movie.poster} alt={movie.Title || movie.title} className="w-full h-auto" />
        <h3>{movie.Title || movie.title}</h3>
        <p>{movie.Year || movie.year}</p>
        {/* Add more movie details as needed */}
      </Link>
    </div>
  );
};

export default MovieCard;
