import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  IoNotifications,
  IoLogOut,
  IoMenu,
  IoClose,
  IoHome,
  IoBusiness,
  IoBook,
  IoHelpCircle,
  IoPeople,
} from "react-icons/io5";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navbar on login/register pages
  if (["/login", "/register"].includes(location.pathname)) return null;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/login");
  };

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  const navLinks = [
    { to: "/", icon: <IoHome />, label: "Home" },
    { to: "/university", icon: <IoBusiness />, label: "University" },
    { to: "/clubs", icon: <IoPeople />, label: "Clubs" },
    { to: "/library", icon: <IoBook />, label: "Library" },
    { to: "/helpdesk", icon: <IoHelpCircle />, label: "Help Desk" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? "navbar-sticky" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎓 Campus
        </Link>

        <div className="navbar-links desktop-only">
          {navLinks.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className={location.pathname.includes(to) ? "active" : ""}
            >
              {React.cloneElement(icon, {
                className: location.pathname.includes(to)
                  ? "icon-green"
                  : "icon-black",
              })}{" "}
              {label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <button
                className="notification-btn desktop-only"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <IoNotifications className="icon-green" />
              </button>

              <Link to="/profile" className="profile-link desktop-only">
                <img
                  src={
                    user.profilePicture ||
                    `https://ui-avatars.com/api/?name=${user.name}`
                  }
                  alt="Profile"
                  className="profile-img"
                />
              </Link>

              <button
                onClick={handleLogout}
                className="logout-btn desktop-only"
              >
                <IoLogOut /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="signin-btn desktop-only">
              Sign In
            </Link>
          )}

          <button className="navbar-menu-toggle" onClick={toggleMobileMenu}>
            {showMobileMenu ? (
              <IoClose className="icon-green" />
            ) : (
              <IoMenu className="icon-green" />
            )}
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="navbar-mobile">
          {navLinks.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setShowMobileMenu(false)}
              className={location.pathname.includes(to) ? "active" : ""}
            >
              {React.cloneElement(icon, {
                className: location.pathname.includes(to)
                  ? "icon-green"
                  : "icon-black",
              })}{" "}
              {label}
            </Link>
          ))}

          {user ? (
            <>
              <div className="mobile-profile">
                <img
                  src={
                    user.profilePicture ||
                    `https://ui-avatars.com/api/?name=${user.name}`
                  }
                  alt="Profile"
                />
                <span>{user.name}</span>
              </div>
              <button onClick={handleLogout} className="mobile-logout-btn">
                <IoLogOut /> Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="mobile-signin-btn"
              onClick={() => setShowMobileMenu(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
