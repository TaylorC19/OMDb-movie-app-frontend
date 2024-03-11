import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { FaHeart, FaSearch, FaHome } from "react-icons/fa";
import { IoIosLogIn, IoIosLogOut, IoMdCreate } from "react-icons/io";

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
          <div className="flex gap-4 text-white">
            <button onClick={() => navigate("/")}>
              <FaHome className="mx-auto" style={{ fontSize: "24px" }} />
              <span>Home</span>
            </button>
            <button onClick={() => navigate("/search")}>
              <FaSearch className="mx-auto" style={{ fontSize: "24px" }} />
              <span>Search</span>
            </button>
            <button
              className="flex flex-col flex-wrap content-center"
              onClick={() => navigate("/favorite")}
            >
              <FaHeart
                className="mx-auto"
                style={{ color: "red", fontSize: "24px" }}
              />
              <span>Favorites</span>
            </button>
            <button onClick={handleLogOut}>
              <IoIosLogOut className="mx-auto" style={{ fontSize: "24px" }} />
              <span>Log Out</span>
            </button>
          </div>
        ) : (
          <div className="flex gap-4 text-white">
            <button onClick={() => navigate("/")}>
              <FaHome className="mx-auto" style={{ fontSize: "24px" }} />
              <span>Home</span>
            </button>
            <button onClick={() => navigate("/search")}>
              <FaSearch className="mx-auto" style={{ fontSize: "24px" }} />
              <span>Search</span>
            </button>
            <button onClick={() => navigate("/auth/login")}>
              <IoIosLogIn className="mx-auto" style={{ fontSize: "24px" }} />
              <span>Log In</span>
            </button>
            <button onClick={() => navigate("/auth/signup")}>
              <IoMdCreate className="mx-auto" style={{ fontSize: "24px" }} />
              <span>Sign Up</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
