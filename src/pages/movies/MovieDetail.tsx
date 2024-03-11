import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import utils from "../../utils/utils";
import { singleMovieType } from "../../global.t";
import Header from "../../components/Header";
import { UserAuth } from "../../context/AuthContext";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<singleMovieType | null>(null);
  const { user } = UserAuth();

  async function addFavorites(event: React.MouseEvent<HTMLButtonElement>) {
    const movieBody = {
      title: movie?.Title,
      imdb_id: movie?.imdbID,
      poster: movie?.Poster,
      year: movie?.Year,
    };
    const moviePost = await utils.requests.secure.post('/movie', movieBody);

    const favoriteBody = {
      user_id: user.sub,
      movie_id: moviePost.data.id
    };

    return await utils.requests.secure.post('/favorites', favoriteBody);
  }

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
      <Header></Header>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-1/2">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-auto  object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">
              {movie.Title}
            </h1>
            <p className="text-sm md:text-base mb-2">{movie.Year}</p>
            <p className="text-sm md:text-base mb-2">{movie.Rated}</p>
            <p className="text-sm md:text-base mb-2">{movie.Runtime}</p>
            <p className="text-sm md:text-base mb-2">Genre: {movie.Genre}</p>
            <p className="text-sm md:text-base mb-2">
              Directory: {movie.Director}
            </p>
            <p className="text-sm md:text-base mb-2">Writer: {movie.Writer}</p>
            <p className="text-sm md:text-base mb-2">Actors: {movie.Actors}</p>
            <p className="text-sm md:text-base mb-2">Plot: {movie.Plot}</p>
            <div className="flex flex-col">
              <p className="text-sm md:text-base mb-2"></p>Ratings:
              {movie.Ratings.map((rating, index) => {
                return (
                  <div key={index}>
                    <p className="text-sm md:text-base mb-2">
                      {rating.Source}: {rating.Value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {user ? (
          <>
            <button 
              className="flex mx-auto p-2 border-2 border-black"
              onClick={addFavorites}
            >
              Add to Favorites!
            </button>
          </>
        ) : (
          <>
            <button>Login to save!</button>
          </>
        )}
      </div>
    </>
  );
};

export default MovieDetail;
