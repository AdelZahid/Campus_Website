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

  // Don't show navbar on login/register pages
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  if (isAuthPage) return null;

  // Handle scroll event for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className={`navbar ${isScrolled ? "navbar-sticky" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span>🎓 Campus</span>
        </Link>

        <div className="navbar-links desktop-only">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            <IoHome
              className={
                location.pathname === "/" ? "icon-green" : "icon-black"
              }
            />{" "}
            Home
          </Link>
          <Link
            to="/university"
            className={
              location.pathname.includes("/university") ? "active" : ""
            }
          >
            <IoBusiness
              className={
                location.pathname.includes("/university")
                  ? "icon-green"
                  : "icon-black"
              }
            />{" "}
            University
          </Link>
          <Link
            to="/clubs"
            className={location.pathname.includes("/clubs") ? "active" : ""}
          >
            <IoPeople
              className={
                location.pathname.includes("/clubs")
                  ? "icon-green"
                  : "icon-black"
              }
            />{" "}
            Clubs
          </Link>
          <Link
            to="/library"
            className={location.pathname.includes("/library") ? "active" : ""}
          >
            <IoBook
              className={
                location.pathname.includes("/library")
                  ? "icon-green"
                  : "icon-black"
              }
            />{" "}
            Library
          </Link>
          <Link
            to="/helpdesk"
            className={location.pathname.includes("/helpdesk") ? "active" : ""}
          >
            <IoHelpCircle
              className={
                location.pathname.includes("/helpdesk")
                  ? "icon-green"
                  : "icon-black"
              }
            />{" "}
            Help Desk
          </Link>
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
                    "https://ui-avatars.com/api/?name=" + user.name
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
            <div className="auth-buttons desktop-only">
              <Link to="/login" className="signin-btn">
                Sign In
              </Link>
            </div>
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

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="navbar-mobile">
          <Link
            to="/"
            onClick={() => setShowMobileMenu(false)}
            className={location.pathname === "/" ? "active" : ""}
          >
            <IoHome
              className={
                location.pathname === "/" ? "icon-green" : "icon-black"
              }
            />{" "}
            Home
          </Link>
          <Link
            to="/university"
            onClick={() => setShowMobileMenu(false)}
            className={
              location.pathname.includes("/university") ? "active" : ""
            }
          >
            <IoBusiness
              className={
                location.pathname.includes("/university")
                  ? "icon-green"
                  : "icon-black"
              }
            />{" "}
            University
          </Link>
          <Link
            to="/clubs"
            onClick={() => setShowMobileMenu(false)}
            className={location.pathname.includes("/clubs") ? "active" : ""}
          >
            <IoPeople
              className={
                location.pathname.includes("/clubs")
                  ? "icon-green"
                  : "icon-black"
              }
            />{" "}
            Clubs
          </Link>
          <Link
            to="/library"
            onClick={() => setShowMobileMenu(false)}
            className={location.pathname.includes("/library") ? "active" : ""}
          >
            <IoBook
              className={
                location.pathname.includes("/library")
                  ? "icon-green"
                  : "icon-black"
              }
            />{" "}
            Library
          </Link>
          <Link
            to="/helpdesk"
            onClick={() => setShowMobileMenu(false)}
            className={location.pathname.includes("/helpdesk") ? "active" : ""}
          >
            <IoHelpCircle
              className={
                location.pathname.includes("/helpdesk")
                  ? "icon-green"
                  : "icon-black"
              }
            />{" "}
            Help Desk
          </Link>

          {user ? (
            <>
              <div className="mobile-profile">
                <img
                  src={
                    user.profilePicture ||
                    "https://ui-avatars.com/api/?name=" + user.name
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
            <div className="mobile-auth-buttons">
              <Link
                to="/login"
                className="mobile-signin-btn"
                onClick={() => setShowMobileMenu(false)}
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
