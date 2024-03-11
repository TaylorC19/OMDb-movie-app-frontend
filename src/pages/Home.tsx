import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header></Header>
      <main className="pl-3">
        <h1 className="text-3xl font-bold underline">Welcome to Home</h1>
        <p>Please sign up to start creating your library of media.</p>
        <p>Click "Search" to start browsing the vast library of movies, TV shows, and game.</p>

      </main>
    </div>
  );
}

export default Home;