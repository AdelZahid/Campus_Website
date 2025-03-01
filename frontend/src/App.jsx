import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";

// Import components and pages
import HomePage from "./pages/HomePage/HomePage";

// Dummy data for notifications and profile (replace with actual data fetching)
const notifications = [
  { id: 1, message: "New message from Sarah Johnson", time: "2 hours ago" },
  {
    id: 2,
    message: "MIT Robotics Club posted a new event",
    time: "5 hours ago",
  },
  {
    id: 3,
    message: "Your assignment for CS401 is due tomorrow",
    time: "1 day ago",
  },
  {
    id: 4,
    message: "New university resources available in library",
    time: "3 days ago",
  },
];

// Navbar Component
const Navbar = ({ user, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  // Don't show navbar on login/register pages
  const location = window.location.pathname;
  const isAuthPage = location === "/login" || location === "/register";

  if (isAuthPage) {
    return null;
  }

  return (
    <nav className="main-navbar">
      <div className="logo">
        <img src="/logo.png" alt="Campus Logo" />
        <span>Campus</span>
      </div>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/university">Universities</Link>
            <Link to="/clubs">Clubs</Link>
            <Link to="/library">Library</Link>
            <Link to="/helpdesk">Helpdesk</Link>
            <button
              className="notification-btn"
              onClick={() => setShowNotifications(true)}
            >
              <i className="fas fa-bell"></i>
            </button>
            <img
              className="profile-img"
              src={
                user.avatar ||
                "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
              }
              alt="Profile"
              onClick={() => navigate("/profile")}
            />
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">
              Sign In
            </Link>
            <Link to="/register" className="register-btn">
              Sign Up
            </Link>
          </div>
        )}
      </div>
      {showNotifications && (
        <div
          className="notifications-overlay"
          onClick={() => setShowNotifications(false)}
        >
          <div className="notifications" onClick={(e) => e.stopPropagation()}>
            <h3>Notifications</h3>
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <div className="notification-content">
                    <p>{notification.message}</p>
                    <span className="notification-time">
                      {notification.time}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowNotifications(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// Simple page components
const ProfilePage = () => {
  return (
    <div className="page-container">
      <div className="container">
        <h1>Profile Page</h1>
        <p>Profile information will go here.</p>
      </div>
    </div>
  );
};

const NotificationsPage = () => {
  return (
    <div className="page-container">
      <div className="container">
        <h1>All Notifications</h1>
        <ul className="notifications-list">
          {notifications.map((notification) => (
            <li key={notification.id} className="notification-item">
              <div className="notification-content">
                <p>{notification.message}</p>
                <span className="notification-time">{notification.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Import other pages
import UniversityPage from "./pages/UniversityPage/UniversityPage";
import UniversityDetailPage from "./pages/UniversityPage/UniversityDetailPage";
import ProgramsPage from "./pages/UniversityPage/ProgramsPage";
import FacultyPage from "./pages/UniversityPage/FacultyPage";
import VirtualTourPage from "./pages/UniversityPage/VirtualTourPage";
import ViewDetailsPage from "./pages/UniversityPage/ViewDetailsPage";
import HelpdeskPage from "./pages/HelpdeskPage/HelpdeskPage";
import AskQuestionPage from "./pages/HelpdeskPage/AskQuestionPage";
import QuestionDetailPage from "./pages/HelpdeskPage/QuestionDetailPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ClubsPage from "./pages/ClubsPage/ClubsPage";

function App() {
  const [user, setUser] = useState(null); // Simulate user login state

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/university" element={<UniversityPage />} />
        <Route path="/university/:id" element={<UniversityDetailPage />} />
        <Route path="/university/:id/programs" element={<ProgramsPage />} />
        <Route path="/university/:id/faculty" element={<FacultyPage />} />
        <Route
          path="/university/:id/virtual-tour"
          element={<VirtualTourPage />}
        />
        <Route path="/university/:id/details" element={<ViewDetailsPage />} />
        <Route path="/helpdesk" element={<HelpdeskPage />} />
        <Route path="/helpdesk/ask" element={<AskQuestionPage />} />
        <Route path="/helpdesk/question/:id" element={<QuestionDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/clubs" element={<ClubsPage />} />
      </Routes>
    </>
  );
}

export default App;
