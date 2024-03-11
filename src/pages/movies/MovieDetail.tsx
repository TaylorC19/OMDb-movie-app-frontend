import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import utils from "../../utils/utils";
import { singleMovieType } from "../../global.t";


const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<singleMovieType | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await utils.requests.get(
          `movie/api/movie?imdb_id=${movieId}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        {movie ?
          <>
            <h1>{movie.Title}</h1>
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Year}</p>
            {/* Display other movie details as needed */}
          </> :
          <></>
        }
      </div>
    </>
  );
};

export default MovieDetail;
