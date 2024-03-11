import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { AuthContextProvider } from './context/AuthContext';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import MovieDetail from './pages/movies/MovieDetail';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/favorite' element={<Favorites />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/movie/:movieId' element={<MovieDetail />}></Route>
          <Route path='/auth/login' element={<Login />}></Route>
          <Route path='/auth/signup' element={<Signup />}></Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
