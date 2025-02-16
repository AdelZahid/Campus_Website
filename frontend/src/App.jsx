import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Programs from './components/Programs/Programs'
import Title from './components/Title/Title'
import About from './components/About/About'
import Footer from './components/Footer/Footer'

import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/HomePage.jsx";
import University from "./pages/UniversityPage/UniversityPage.jsx";
import Library from "./pages/LibraryPage/LibraryPage.jsx";

import Account from "./pages/Acount/account.jsx";
import Messages from "./pages/Chatpage/Pages/home.jsx";
import Login from "./pages/LoginPage/LoginPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/university" element={<University />} />
      <Route path="/library" element={<Library />} />
      <Route path="/login" element={<Login />} />
      <Route path="/account" element={<Account />} />
      <Route path="/messages" element={<Messages />} />
    </Routes>
  );
}

export default App
