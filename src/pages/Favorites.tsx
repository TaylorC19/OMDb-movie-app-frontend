import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Header from "../components/Header";
import utils from "../utils/utils";
import MovieCard from "../components/MovieCard";
import { searchMovieType } from "../global.t";

const Favorites = () => {
  const [favorites, setFavorites] = useState<{
    id: number;
    movie: searchMovieType
  }[]>([]);
console.log(favorites)
  useEffect(() => {
    async function getFavorites() {
      const favoritesList = await utils.requests.secure.get('/favorites')
      console.log(favoritesList)
      const favortiesData = favoritesList.data;
      console.log(favortiesData);
      
      setFavorites(favortiesData);
    }

    getFavorites()
  }, [])

  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold flex">
        Favorites <FaHeart style={{ color: "red" }} />
      </h1>

      <main>
        <div className="grid sm:grid-cols-3 gap-1">
          {favorites.map((favorite, index) => {
            return <MovieCard movie={favorite.movie} index={index} />;
          })}
        </div>
      </main>
    </div>
  );
};

export default Favorites;
