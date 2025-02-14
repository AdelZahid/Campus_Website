import React, { useState } from "react";
import "../css/style.css";
import campusLogo from "../assets/logos/campus-icon.png";
import axios from "axios";

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  // State to store error messages

  const toggleActive = () => {
    setIsActive(!isActive);
    setError(""); // Reset error message when switching
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check for valid Gmail format
    if (name === "email" && !value.endsWith("@gmail.com")) {
      setErrorMessage("Please enter a valid Gmail address.");
    } else {
      setErrorMessage(""); // Clear error when valid
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      console.log(res.data);
      alert("Registration successful!");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log(res.data);
      setErrorMessage(""); // Clear error on success
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Invalid email or password."
      );
    }
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      {/* Sign Up Form */}
      <div className="form-container sign-up">
        <form onSubmit={handleSignUp}>
          <img src={campusLogo} alt="Campus Logo" className="logo" />
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <i className="fab fa-google"></i>
            </a>
            <a href="#" className="icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="icon">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {/* Error message */}
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in">
        <form onSubmit={handleSignIn}>
          <img src={campusLogo} alt="Campus Logo" className="logo" />
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <i className="fab fa-google"></i>
            </a>
            <a href="#" className="icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="icon">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email password</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {/* Error message */}
          <a href="#">Forget Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Toggle Panels */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of the site features</p>
            <button className="hidden" id="login" onClick={toggleActive}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of the site
              features
            </p>
            <button className="hidden" id="register" onClick={toggleActive}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
