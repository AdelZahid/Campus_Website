import React, { useState } from "react";
import "./LoginPage.css";
import campusLogo from "../../assets/logos/campus-icon.png";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const toggleActive = () => {
    setIsActive(!isActive);
    setErrorMessage(""); // Reset error message when switching
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "email" && !value.endsWith("@gmail.com")) {
      setErrorMessage("Please enter a valid Gmail address.");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setErrorMessage("");
    const url = `http://localhost:5000/api/auth/${type}`;
    const data =
      type === "register"
        ? formData
        : { email: formData.email, password: formData.password };

    try {
      const res = await axios.post(url, data);
      console.log(res.data);
      if (type === "register") alert("Registration successful!");
      setFormData({ name: "", email: "", password: "" }); // Clear fields on success
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div>
      <Navbar />
      <body className="login-page">
        <div className={`container ${isActive ? "active" : ""}`} id="container">
          <div className="form-container sign-up">
            <form onSubmit={(e) => handleSubmit(e, "register")}>
              <img src={campusLogo} alt="Campus Logo" className="logo" />
              <h1>Create Account</h1>
              <div className="social-icons">
                {["google", "facebook-f", "github", "linkedin-in"].map(
                  (icon) => (
                    <a key={icon} href="#" className="icon">
                      <i className={`fab fa-${icon}`}></i>
                    </a>
                  )
                )}
              </div>
              <span>or use your email for registration</span>
              {["name", "email", "password"].map((field) => (
                <input
                  key={field}
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                />
              ))}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button type="submit">Sign Up</button>
            </form>
          </div>

          <div className="form-container sign-in">
            <form onSubmit={(e) => handleSubmit(e, "login")}>
              <img src={campusLogo} alt="Campus Logo" className="logo" />
              <h1>Sign In</h1>
              <div className="social-icons">
                {["google", "facebook-f", "github", "linkedin-in"].map(
                  (icon) => (
                    <a key={icon} href="#" className="icon">
                      <i className={`fab fa-${icon}`}></i>
                    </a>
                  )
                )}
              </div>
              <span>or use your email password</span>
              {["email", "password"].map((field) => (
                <input
                  key={field}
                  type={field}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                />
              ))}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <a href="#">Forget Your Password?</a>
              <button type="submit">Sign In</button>
            </form>
          </div>

          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>
                  Enter your personal details to use all of the site features
                </p>
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
      </body>
    </div>
  );
};

export default Login;
