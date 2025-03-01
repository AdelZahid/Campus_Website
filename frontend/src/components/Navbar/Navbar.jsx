import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${isScrolled ? "navbar-sticky" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span>Campus</span>
        </Link>

        {/* Desktop Navigation */}
        {user ? (
          <>
            <div className="navbar-links desktop-only">
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
              <Link
                to="/university"
                className={
                  location.pathname.includes("/university") ? "active" : ""
                }
              >
                Universities
              </Link>
              <Link
                to="/clubs"
                className={location.pathname.includes("/clubs") ? "active" : ""}
              >
                Clubs
              </Link>
              <Link
                to="/library"
                className={
                  location.pathname.includes("/library") ? "active" : ""
                }
              >
                Library
              </Link>
              <Link
                to="/helpdesk"
                className={
                  location.pathname.includes("/helpdesk") ? "active" : ""
                }
              >
                Helpdesk
              </Link>
            </div>
            <div className="navbar-actions desktop-only">
              <button
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
              >
                <i className="fas fa-bell"></i>
              </button>
              <Link to="/profile" className="profile-link">
                <img
                  className="profile-img"
                  src={
                    user.avatar ||
                    "https://ui-avatars.com/api/?name=User&background=21a663&color=fff"
                  }
                  alt="Profile"
                />
              </Link>
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="navbar-links desktop-only">
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
              <Link
                to="/university"
                className={
                  location.pathname.includes("/university") ? "active" : ""
                }
              >
                Universities
              </Link>
              <Link
                to="/clubs"
                className={location.pathname.includes("/clubs") ? "active" : ""}
              >
                Clubs
              </Link>
            </div>
            <div className="auth-buttons desktop-only">
              <Link to="/login" className="signin-btn">
                Sign in
              </Link>
              <Link to="/register" className="signup-btn">
                Sign up
              </Link>
            </div>
          </>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="navbar-mobile show" ref={mobileMenuRef}>
          {user ? (
            <>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
              <Link
                to="/university"
                className={
                  location.pathname.includes("/university") ? "active" : ""
                }
              >
                Universities
              </Link>
              <Link
                to="/clubs"
                className={location.pathname.includes("/clubs") ? "active" : ""}
              >
                Clubs
              </Link>
              <Link
                to="/library"
                className={
                  location.pathname.includes("/library") ? "active" : ""
                }
              >
                Library
              </Link>
              <Link
                to="/helpdesk"
                className={
                  location.pathname.includes("/helpdesk") ? "active" : ""
                }
              >
                Helpdesk
              </Link>
              <Link to="/profile" className="mobile-profile">
                <img
                  src={
                    user.avatar ||
                    "https://ui-avatars.com/api/?name=User&background=21a663&color=fff"
                  }
                  alt="Profile"
                />
                <span>My Profile</span>
              </Link>
              <button className="mobile-logout-btn" onClick={onLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
              <Link
                to="/university"
                className={
                  location.pathname.includes("/university") ? "active" : ""
                }
              >
                Universities
              </Link>
              <Link
                to="/clubs"
                className={location.pathname.includes("/clubs") ? "active" : ""}
              >
                Clubs
              </Link>
              <div className="mobile-auth-buttons">
                <Link to="/login" className="mobile-signin-btn">
                  <i className="fas fa-sign-in-alt"></i> Sign in
                </Link>
                <Link to="/register" className="mobile-signup-btn">
                  <i className="fas fa-user-plus"></i> Sign up
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;