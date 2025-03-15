import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaGoogle, FaGithub, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import "./LoginPage.css";
import { useAuth } from "../../context/AuthProvider";

const LoginPage = ({ onLogin }) => {
  const { authUser, setAuthUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  const onSubmit = async (data) => {
    try {
      const userInfo = {
        username: data.name || "", // Always include to avoid hook mismatch
        email: data.email,
        password: data.password,
      };

      const endpoint = isLogin ? "login" : "signup";
      const res = await axios.post(`/api/user/${endpoint}`, userInfo, {
        withCredentials: true,
      });

      if (res.data) {
        alert(res.data.message);
        if (isLogin) {
          setAuthUser(res.data.user); // Update global auth state
          localStorage.setItem("user", JSON.stringify(res.data.user));
          alert("Login successful!");
          onLogin(res.data.user);
          navigate("/");
          window.location.reload(); // Reload the page to reflect changes
        } else {
          alert("SignUp successful! Please sign in.");
          setIsLogin(true);
        }
      }
    } catch (err) {
      console.error("Error response:", err.response); // ✅ Debugging
      if (err.response?.data?.message) {
        alert(err.response.data.message); // ✅ Shows correct backend message
      } else {
        alert("An error occurred, please try again.");
      }
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
            {/* Always include name field even if hidden to avoid hook issues */}
            <input type="hidden" {...register("name")} />

            {!isLogin && (
              <div className="input-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name", { required: !isLogin })}
                />
                {errors.name && (
                  <span className="text-red-600 text-sm font-semibold">
                    **Name is Required**
                  </span>
                )}
              </div>
            )}

            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-600 text-sm font-semibold">
                  **Email is required**
                </span>
              )}
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-600 text-sm font-semibold">
                  **Password is required**
                </span>
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
