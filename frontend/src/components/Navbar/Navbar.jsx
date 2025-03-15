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
  IoChatbubbleEllipses, // Add a chat icon
} from "react-icons/io5";
import { useAuth } from "../../context/AuthProvider";
import "./Navbar.css";
import chat from "../../pages/Chatpage/Pages/home.jsx";
import Cookies from "js-cookie";
import axios from "axios";
const Navbar = ({ user, onLogout }) => {
  const { authUser, setAuthUser } = useAuth();
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

  // Logout the user
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true); // Set loading to true at the start
    try {
      // Make the logout request to the backend
      const res = await axios.post("/api/user/logout", null, {
        withCredentials: true, // Include credentials (cookies)
      });

      // Clear local storage and cookies
      localStorage.removeItem("user");
      Cookies.remove("jwt");

      // Update the auth state
      if (onLogout) onLogout();
      setAuthUser(null);

      // Show success message
      alert("Logged out successfully");
      navigate("/");

      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  const handleNotificationsClick = () => {
    navigate("/notifications"); // Navigate to the notifications page
  };

  // Define the navigation links
  const navLinks = [
    { to: "/", icon: <IoHome />, label: "Home" },
    { to: "/university", icon: <IoBusiness />, label: "University" },
    { to: "/clubs", icon: <IoPeople />, label: "Clubs" },
    { to: "/library", icon: <IoBook />, label: "Library" },
    { to: "/helpdesk", icon: <IoHelpCircle />, label: "Help Desk" },
  ];

  // Add the Chat link if the user is logged in
  if (authUser) {
    navLinks.push({
      to: "/chat",
      icon: <IoChatbubbleEllipses />,
      label: "Chat",
    });
  }

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
          {authUser ? (
            <>
              <button
                className="notification-btn desktop-only"
                onClick={handleNotificationsClick} // Navigate to notifications page
              >
                <IoNotifications className="icon-green" />
              </button>

              <Link to="/profile" className="profile-link desktop-only">
                <img
                  src={
                    authUser.profilePicture ||
                    `https://ui-avatars.com/api/?name=${authUser.username}`
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

          {authUser ? (
            <>
              <div className="mobile-profile">
                <img
                  src={
                    authUser.profilePicture ||
                    `https://ui-avatars.com/api/?name=${authUser.username}`
                  }
                  alt="Profile"
                />
                <span>{authUser.username}</span>
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
