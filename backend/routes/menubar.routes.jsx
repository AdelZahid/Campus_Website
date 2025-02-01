import HomePage from "../../frontend/src/pages/HomePage";
import Login from "../../frontend/src/pages/LoginPage";
import Signup from "../../frontend/src/pages/SignupPage";
import University from "../../frontend/src/pages/UniversityPage";
import Clubs from "../../frontend/src/pages/ClubsPage";
import Library from "../../frontend/src/pages/LibraryPage";
import Helpdesk from "../../frontend/src/pages/HelpdeskPage";
import Jobs from "../../frontend/src/pages/JobsPage";
import Profile from "../../frontend/src/pages/ProfilePage";


function AppRouters() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/university" element={<University />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/library" element={<Library />} />
        <Route path="/helpdesk" element={<Helpdesk />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        {/* Property Details Page */}
      </Routes>
    </Router>
  );
}

export default AppRouters;
