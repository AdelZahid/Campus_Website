import { Routes, Route } from "react-router-dom";
import AccountPage from "../pages/Acount/account.jsx";
import MessagePage from "../pages/Chatpage/Pages/home.jsx";
import LoginPage from "../pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/account/*" element={<AccountPage />} />
      <Route path="/messages" element={<MessagePage />} />
    </Routes>
  );
}

export default App;
