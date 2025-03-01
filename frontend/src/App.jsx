import { useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import "./App.css";

// Import components and pages
import HomePage from "./pages/HomePage/HomePage";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import BookDetailPage from "./pages/LibraryPage/BookDetailPage";
import BorrowPage from "./pages/LibraryPage/BorrowPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProjectDetailPage from "./pages/ProfilePage/ProjectDetailPage";

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

// Navbar Component is imported from components/Navbar/Navbar.jsx
import Navbar from "./components/Navbar/Navbar";

// Other simple page components

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
//LibraryPage already imported elsewhere

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
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
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
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/library/:bookId" element={<BookDetailPage />} />
        <Route path="/library/borrow/:bookId" element={<BorrowPage />} />
      </Routes>
    </>
  );
}

export default App;
