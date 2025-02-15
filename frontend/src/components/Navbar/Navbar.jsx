import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import menu_icon from "../../assets/menu-icon.png";

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
      <img src={logo} alt="" className="logo" />
      <ul className={mobileMenu ? '':'hide-mobile-menu'}>
        <li>University</li>
        <li>Clubs</li>
        <li>Library</li>
        <li>Helpdesk</li>
        <li>Jobs</li>
        <li>
          <button className="btn">Sign In</button>
        </li>
      </ul>
      <img src={menu_icon} alt="" className="menu-icon" onClick={toggleMenu}/>
    </nav>
  );
}

export default NavBar
