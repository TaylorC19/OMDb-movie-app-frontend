import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Header from "../components/Header";
import utils from "../utils/utils";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
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
    </div>
  );
};

export default Favorites;
