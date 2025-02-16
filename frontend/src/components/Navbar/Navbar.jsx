import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import menu_icon from "../../assets/menu-icon.png";
import { Link } from 'react-router-dom'

const NavBar = () => {
  
  const [sticky, setSticky] = React.useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, []);

  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleMenu = () => {
    if(mobileMenu) {
      setMobileMenu(false);
    }
    else {
      setMobileMenu(true);
    }
  }
  
  return (
    <nav className={`container ${sticky ? "dark-nav" : ""}`}>
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <ul className={mobileMenu ? '':'hide-mobile-menu'}>
        <li>
          <Link to="/university">
            University
          </Link>
        </li>
        <li>
          <Link to="/clubs">
            Clubs
          </Link>
        </li>
        <li>
          <Link to="/library">
            Library
          </Link>
        </li>
        <li>
          <Link to="/helpdesk">
            Helpdesk
          </Link>
        </li>
        <li>
          <Link to="/messages">
            Messages
          </Link>
        </li>
        <li>
          <Link to="/login">
            <button className="btn">Sign In</button>
          </Link>
        </li>
      </ul>
      <img src={menu_icon} alt="" className="menu-icon" onClick={toggleMenu}/>
    </nav>
  );
}

export default NavBar
