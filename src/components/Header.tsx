import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { FaHeart } from "react-icons/fa";


const Header = () => {
  const { user, logOut } = UserAuth();

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      console.log("user", user);
      await logOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header>
      <nav className="flex justify-between content-center bg-blue-700 m-0 h-full w-full p-1">
        <h1 className="text-white my-auto">Movie App</h1>

        {Object.keys(user).length !== 0 ? (
          <div className="flex gap-1 text-white">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/search")}>Search</button>
            <button 
              className="flex flex-col flex-wrap content-center"
              onClick={() => navigate("/favorite")}
            >
              <FaHeart className="mx-auto" style={{ color: "red", fontSize: "24px" }} />
              <span>Favorites</span>
            </button>
            <button onClick={handleLogOut}>Log Out</button>
          </div>
        ) : (
          <div className="flex gap-1 text-white">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/public-recipes")}>Search</button>
            <button onClick={() => navigate("/auth/login")}>Log In</button>
            <button onClick={() => navigate("/auth/signup")}>Sign Up</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
