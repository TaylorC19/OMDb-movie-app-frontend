import React from "react";
import { FaHeart } from "react-icons/fa";
import Header from "../components/Header";

const Favorites = () => {
  return (
    <div>
      <Header />
      <FaHeart style={{ color: "red", fontSize: "24px" }} />
    </div>
  );
};

export default Favorites;
