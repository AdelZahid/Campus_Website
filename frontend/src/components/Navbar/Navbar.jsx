import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
// import logo from '../../assets/logo.png'; // Removed logo import

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For demo, you'd use actual auth
  const notificationRef = useRef(null);

  // Check if user has scrolled for sticky navbar
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setSticky(window.scrollY > 50);
    });

    // Close notifications when clicking outside
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // For demo purposes - in real app you'd have authentication
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className={`navbar ${sticky ? "navbar-sticky" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          {/* Logo removed */}
          <Link to="/">Campus Connect</Link> {/* Placeholder text for logo */}
        </div>

        <div className={`navbar-links ${mobileMenu ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/university">Universities</Link>
            </li>
            <li>
              <Link to="/clubs">Clubs</Link>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/library">Library</Link>
                </li>
                <li>
                  <Link to="/helpdesk">Helpdesk</Link>
                </li>
                <li>
                  <Link to="/messages">Messages</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="navbar-actions">
          {isLoggedIn ? (
            <>
              <div className="notification-wrapper" ref={notificationRef}>
                <button
                  className="notification-btn"
                  onClick={toggleNotifications}
                  aria-label="Notifications"
                >
                  <i className="fas fa-bell"></i>
                  <span className="notification-badge">3</span>
                </button>

                {showNotifications && (
                  <div className="notification-panel">
                    <div className="notification-header">
                      <h3>Notifications</h3>
                      <button
                        className="close-btn"
                        onClick={toggleNotifications}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="notification-list">
                      <div className="notification-item unread">
                        <div className="notification-icon">
                          <i className="fas fa-user-circle"></i>
                        </div>
                        <div className="notification-content">
                          <p>John Smith accepted your friend request</p>
                          <span className="notification-time">
                            2 minutes ago
                          </span>
                        </div>
                      </div>
                      <div className="notification-item unread">
                        <div className="notification-icon">
                          <i className="fas fa-comment-alt"></i>
                        </div>
                        <div className="notification-content">
                          <p>New comment on your question about CS courses</p>
                          <span className="notification-time">1 hour ago</span>
                        </div>
                      </div>
                      <div className="notification-item">
                        <div className="notification-icon">
                          <i className="fas fa-calendar-check"></i>
                        </div>
                        <div className="notification-content">
                          <p>Reminder: Campus tour tomorrow at 2 PM</p>
                          <span className="notification-time">5 hours ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="notification-footer">
                      <Link to="/notifications">View All Notifications</Link>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/profile" className="profile-link">
                <div className="profile-avatar">
                  <img
                    src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
                    alt="Profile"
                  />
                </div>
              </Link>
            </>
          ) : (
            <button className="signin-btn" onClick={toggleLogin}>
              Sign In
            </button>
          )}

          <button className="menu-toggle" onClick={toggleMenu}>
            <i className={`fas ${mobileMenu ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
