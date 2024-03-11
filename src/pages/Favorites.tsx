import React from "react";
import { FaHeart } from "react-icons/fa";
import Header from "../components/Header";

const Favorites = () => {
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
