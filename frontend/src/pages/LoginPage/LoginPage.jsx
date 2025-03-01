import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import "./LoginPage.css";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login/signup logic here
    console.log(formData);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="form-container">
          <h1 className="form-title">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="form-subtitle">
            {isLogin
              ? "Sign in to access your account"
              : "Register to get started"}
          </p>

          <div className="social-login">
            <button className="social-btn google">
              <FaGoogle /> Continue with Google
            </button>
            <button className="social-btn github">
              <FaGithub /> Continue with GitHub
            </button>
          </div>

          <div className="divider">
            <span>OR</span>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {isLogin && (
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="form-switch">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={toggleForm} className="switch-btn">
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        <div className="image-container">
          <div className="overlay"></div>
          <div className="content">
            <h2>Campus</h2>
            <p>
              Connect with universities and find your perfect educational path
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
