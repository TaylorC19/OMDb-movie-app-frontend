import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchMovieType } from "../global.t";

const SearchMovies = ({ movies }: { movies: searchMovieType[] }) => {
  const navigate = useNavigate();

  return (
    <div className="grid sm:grid-cols-3 gap-1">
      {movies.map((movie, index) => (
        <div
          key={index}
          className="border rounded p-1 text-center max-w-[min-content]"
        >
          <Link to={`/movie/${movie.imdbID}`}>
            <img src={movie.Poster} alt={movie.Title} className="w-full h-auto" />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            {/* Add more movie details as needed */}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SearchMovies;
