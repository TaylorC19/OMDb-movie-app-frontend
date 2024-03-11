import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";


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
      <nav className="header-div">
        <h1 className="logo">Movie App</h1>

        {Object.keys(user).length !== 0 ? (
          <div className="navigate-items">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/search")}>Search</button>
            <button onClick={() => navigate("/favorite")}>Favorites</button>
            <button onClick={handleLogOut}>Log Out</button>
          </div>
        ) : (
          <div className="navigate-items">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/public-recipes")}>
              Browse public recipes
            </button>
            <button onClick={() => navigate("/auth/login")}>Log In</button>
            <button onClick={() => navigate("/auth/signup")}>Sign Up</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
