import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaGoogle, FaGithub, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const onSubmit = async (data) => {
    try {
      const userInfo = {
        username: data.name, // Changed to match backend
        email: data.email,
        password: data.password,
      };

      const endpoint = isLogin ? "login" : "signup";
      const res = await axios.post(
        `http://localhost:5002/user/${endpoint}`,
        userInfo,
        { withCredentials: true } // Ensure cookies are handled
      );

      if (res.data) {
        alert(res.data.message);
        if (isLogin) {
          onLogin(res.data.user); // Update user state in App.jsx
          navigate("/");
        } else {
          alert("SignUp successful! Please sign in.");
          setIsLogin(true); // Switch to login form after successful signup
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
    }
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

          <form onSubmit={handleSubmit(onSubmit)}>
            {!isLogin && (
              <div className="input-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-red-600">{errors.name.message}</span>
                )}
              </div>
            )}

            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-red-600">{errors.password.message}</span>
              )}
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
            {isLogin ? "Don't have an account?" : "Already have an account?"}
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
