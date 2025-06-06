import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient and QueryClientProvider
import "./App.css";

// Import components and pages
import HomePage from "./pages/HomePage/HomePage";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import BookDetailPage from "./pages/LibraryPage/BookDetailPage";
import BorrowPage from "./pages/LibraryPage/BorrowPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProjectDetailPage from "./pages/ProfilePage/ProjectDetailPage";
import Navbar from "./components/Navbar/Navbar";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";
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
import ChatHome from "./pages/Chatpage/chat2/home/chathome.jsx";
import Message from "./pages/Chatpage/Pages/home.jsx";
import AccountPage from "./pages/Acount/account.jsx";
import { useAuth } from "./context/AuthProvider";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();

  const handleLogin = (userData) => {
    setUser(userData);
    setAuthUser(userData);
    navigate("/");
    window.location.reload();
  };

  const handleLogout = () => {
    setUser(null);
    setAuthUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/chat"
            element={authUser ? <Message /> : <Navigate to="/login" />}
          />
          <Route path="/message" element={<Message />} />
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
          <Route
            path="/helpdesk/question/:id"
            element={<QuestionDetailPage />}
          />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/library/:bookId" element={<BookDetailPage />} />
          <Route path="/library/borrow/:bookId" element={<BorrowPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
