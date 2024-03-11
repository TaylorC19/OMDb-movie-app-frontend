import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchMovieType } from "../global.t";
import MovieCard from "./MovieCard";


const SearchMovies = ({ movies }: { movies: searchMovieType[] }) => {
  const navigate = useNavigate();

  return (
    <div className="grid sm:grid-cols-3 gap-1">
      {movies.map((movie, index) => (
        <MovieCard
          movie={movie}
          index={index}
        />
      ))}
    </div>
  );
};

export default SearchMovies;
