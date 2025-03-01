import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer"; // Added import for Footer component
import "./ClubsPage.css";
import Navbar from "../../components/Navbar/Navbar";

const ClubsPage = () => {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for clubs
  const mockClubs = [
    {
      id: 1,
      name: "Robotics Club",
      category: "Technology",
      members: 156,
      events: 12,
      description:
        "Building the future of robotics and automation, one project at a time.",
      image:
        "https://images.unsplash.com/photo-1561144257-e32e8506aa6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 2,
      name: "Photography Society",
      category: "Arts",
      members: 89,
      events: 8,
      description:
        "Capturing moments and telling stories through the lens of creativity.",
      image:
        "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 3,
      name: "Debate Club",
      category: "Academic",
      members: 62,
      events: 15,
      description:
        "Fostering critical thinking and articulate expression through structured debates.",
      image:
        "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 4,
      name: "Basketball Team",
      category: "Sports",
      members: 28,
      events: 22,
      description:
        "Competing at the highest level while building teamwork and athletic excellence.",
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 5,
      name: "AI Research Group",
      category: "Technology",
      members: 45,
      events: 6,
      description:
        "Exploring the frontiers of artificial intelligence and machine learning.",
      image:
        "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 6,
      name: "Chess Club",
      category: "Games",
      members: 33,
      events: 9,
      description:
        "Mastering strategy and critical thinking through the game of kings.",
      image:
        "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 7,
      name: "Environmental Action",
      category: "Social",
      members: 112,
      events: 18,
      description:
        "Taking action for a sustainable campus and a greener future for all.",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 8,
      name: "Music Band",
      category: "Arts",
      members: 22,
      events: 14,
      description:
        "Creating harmony through collaborative musical exploration and performance.",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    },
  ];

  const categories = [
    "All",
    "Technology",
    "Arts",
    "Academic",
    "Sports",
    "Games",
    "Social",
  ];

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setClubs(mockClubs);
      setFilteredClubs(mockClubs);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter clubs based on active category and search query
    let result = [...clubs];

    if (activeCategory !== "All") {
      result = result.filter((club) => club.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (club) =>
          club.name.toLowerCase().includes(query) ||
          club.description.toLowerCase().includes(query)
      );
    }

    setFilteredClubs(result);
  }, [activeCategory, searchQuery, clubs]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="clubs-page page-container">
      <Navbar /> {/* Added Navbar component */}
      <div className="container">
        <div className="clubs-hero">
          <div className="clubs-hero-content">
            <h1>Discover Campus Clubs</h1>
            <p>
              Join a community, pursue your passions, and make lasting
              connections.
            </p>
            <div className="clubs-search">
              <input
                type="text"
                placeholder="Search for clubs..."
                value={searchQuery}
                onChange={handleSearch}
              />
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </div>

        <div className="clubs-category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading clubs...</p>
          </div>
        ) : (
          <>
            <h2 className="section-title">
              {activeCategory === "All"
                ? "All Clubs"
                : `${activeCategory} Clubs`}
              <span className="club-count">{filteredClubs.length} clubs</span>
            </h2>

            <div className="clubs-grid">
              {filteredClubs.length > 0 ? (
                filteredClubs.map((club) => (
                  <div className="club-card" key={club.id}>
                    <div
                      className="club-image"
                      style={{ backgroundImage: `url(${club.image})` }}
                    >
                      <div className="club-category">{club.category}</div>
                    </div>
                    <div className="club-content">
                      <h3>{club.name}</h3>
                      <p>{club.description}</p>
                      <div className="club-stats">
                        <div className="stat">
                          <i className="fas fa-users"></i>
                          <span>{club.members} members</span>
                        </div>
                        <div className="stat">
                          <i className="fas fa-calendar-alt"></i>
                          <span>{club.events} events</span>
                        </div>
                      </div>
                      <Link
                        to={`/clubs/${club.id}`}
                        className="btn btn-primary join-btn"
                      >
                        View Club
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <i className="fas fa-search"></i>
                  <h3>No clubs found</h3>
                  <p>Try adjusting your search or filters</p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        <div className="create-club-section">
          <div className="create-club-content">
            <h2>Start Your Own Club</h2>
            <p>
              Have a passion not represented on campus? Create a club and build
              your community!
            </p>
            <Link to="/clubs/create" className="btn btn-primary">
              Create a Club
            </Link>
          </div>
          <div className="create-club-image"></div>
        </div>
      </div>
      <Footer /> {/* Added Footer component */}
    </div>
  );
};

export default ClubsPage;
