import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./LibraryPage.css";

const LibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  // Sample data for resources
  const resources = [
    {
      id: 1,
      title: "Introduction to Artificial Intelligence",
      type: "Book",
      category: "Technology",
      image: "/images/ai-book.jpg",
      author: "John Smith",
      publishedYear: 2021,
      available: true,
    },
    {
      id: 2,
      title: "Molecular Biology",
      type: "Journal",
      category: "Science",
      image: "/images/biology.jpg",
      author: "Maria Johnson",
      publishedYear: 2020,
      available: true,
    },
    {
      id: 3,
      title: "Modern Economic Theory",
      type: "Research Paper",
      category: "Commerce",
      image: "/images/economics.jpg",
      author: "Robert Williams",
      publishedYear: 2022,
      available: false,
    },
    {
      id: 4,
      title: "Renaissance Art History",
      type: "Book",
      category: "Arts",
      image: "/images/art.jpg",
      author: "Emma Thompson",
      publishedYear: 2019,
      available: true,
    },
    {
      id: 5,
      title: "World War II: A Comprehensive Analysis",
      type: "Article",
      category: "History",
      image: "/images/history.jpg",
      author: "David Brown",
      publishedYear: 2022,
      available: true,
    },
    {
      id: 6,
      title: "Quantum Physics Applications",
      type: "Research Paper",
      category: "Research",
      image: "/images/physics.jpg",
      author: "Alan Davidson",
      publishedYear: 2023,
      available: false,
    },
  ];

  // Filter resources based on search, category, and type
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || resource.category === selectedCategory;
    const matchesType =
      selectedType === "All" || resource.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  // Categories and resource types
  const categories = [
    "All",
    "Technology",
    "Science",
    "Arts",
    "Commerce",
    "History",
    "Research",
  ];
  const resourceTypes = ["All", "Book", "Journal", "Research Paper", "Article"];

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, you might trigger an API call here
  };

  return (
    <div className="library-page">
      <Navbar />
      <div className="library-container">
        <header className="library-header">
          <h1>Digital Library</h1>
          <p>
            Discover a world of knowledge with our extensive collection of
            resources
          </p>
        </header>

        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            placeholder="Search by title, author, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <i className="fas fa-search"></i> Search
          </button>
        </form>

        <div className="categories-section">
          <h3>Categories</h3>
          <div className="categories-list">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-pill ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="resource-type-section">
          <h3>Resource Type</h3>
          <div className="resource-type-list">
            {resourceTypes.map((type) => (
              <button
                key={type}
                className={`resource-type-pill ${
                  selectedType === type ? "active" : ""
                }`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="results-section">
          <h2>Found {filteredResources.length} resources</h2>
          <div className="resources-grid">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="resource-card">
                <div className="resource-image">
                  <img src={resource.image} alt={resource.title} />
                </div>
                <div className="resource-info">
                  <Link
                    to={`/library/${resource.id}`}
                    className="resource-title"
                  >
                    {resource.title}
                  </Link>
                  <p className="resource-author">
                    By {resource.author}, {resource.publishedYear}
                  </p>
                  <div className="resource-tags">
                    <span className="resource-type-tag">{resource.type}</span>
                    <span className="resource-category-tag">
                      {resource.category}
                    </span>
                  </div>
                  <div className="resource-actions">
                    <Link
                      to={`/library/${resource.id}`}
                      className="view-details-btn"
                    >
                      View Details
                    </Link>
                    {resource.available ? (
                      <Link
                        to={`/library/borrow/${resource.id}`}
                        className="borrow-btn"
                      >
                        Borrow
                      </Link>
                    ) : (
                      <span className="unavailable-badge">Unavailable</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LibraryPage;
