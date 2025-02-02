import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const handleLoginRegisterClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm"
      style={{
        transition: "top 0.3s",
        top: visible ? "0" : "-70px",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <div
          className="d-flex align-items-center me-auto"
          style={{ marginLeft: "20px" }}
        >
          <Link className="navbar-brand" to="/">
            <img
              src="/src/assets/images/logo.jpg"
              alt="Logo"
              style={{ height: "60px", width: "180px" }}
            />
          </Link>
        </div>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto" style={{ gap: "1.5rem" }}>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            
            <li className="nav-item">
                <Link className="nav-link" to="/university">
                    University
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/clubs">
                    Clubs
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/library">
                    Library
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/helpdesk">
                    Helpdesk
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/jobs">
                    Jobs
                </Link>
            </li>
            </ul>

          {/* Right Side Buttons */}
          <div className="d-flex align-items-center gap-3">

            {/* Login/Register Button */}
            <button
              className="btn btn-link text-dark text-decoration-none"
              onClick={handleLoginRegisterClick}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
