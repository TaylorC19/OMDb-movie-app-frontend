import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { AuthContextProvider } from './context/AuthContext';


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/auth/login' element={<Login />}></Route>
          <Route path='/auth/signup' element={<Signup />}></Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
