import React, { useState, useEffect } from "react";
import "./LibraryPage.css";
import NavBar from "../../components/Navbar/Navbar";

// Sample resource data - in a real app, this would come from an API
const sampleResources = [
  {
    id: 1,
    title: "Introduction to Artificial Intelligence",
    category: "Technology",
    type: "Book",
    author: "John Smith",
    publishDate: "2023-05-15",
    description: "A comprehensive guide to AI concepts and applications",
    coverImage: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Molecular Biology",
    category: "Science",
    type: "Journal",
    author: "Sarah Johnson",
    publishDate: "2023-04-20",
    description: "Advanced research on molecular biology principles",
    coverImage: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Modern Economic Theory",
    category: "Commerce",
    type: "Book",
    author: "Robert Williams",
    publishDate: "2023-06-10",
    description: "Analysis of contemporary economic models and practices",
    coverImage: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Renaissance Art History",
    category: "Arts",
    type: "Book",
    author: "Maria Garcia",
    publishDate: "2023-03-05",
    description: "Exploring the masterpieces of the Renaissance period",
    coverImage: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "Quantum Computing Advances",
    category: "Technology",
    type: "Research Paper",
    author: "David Chen",
    publishDate: "2023-07-01",
    description: "Latest developments in quantum computing technology",
    coverImage: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    title: "Global Climate Change",
    category: "Science",
    type: "Journal",
    author: "Emily Wilson",
    publishDate: "2023-02-28",
    description: "Comprehensive analysis of climate change effects worldwide",
    coverImage: "https://via.placeholder.com/150",
  },
];

// Categories for filter buttons
const categories = [
  "All",
  "Technology",
  "Science",
  "Arts",
  "Commerce",
  "History",
  "Research",
];

// Resource types for filter buttons
const resourceTypes = ["All", "Book", "Journal", "Research Paper", "Article"];

const LibraryPage = () => {
  const [resources, setResources] = useState(sampleResources);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [filteredResources, setFilteredResources] = useState(sampleResources);

  // Filter resources based on search term and selected filters
  useEffect(() => {
    let filtered = [...resources];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          resource.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (resource) => resource.category === selectedCategory
      );
    }

    // Filter by resource type
    if (selectedType !== "All") {
      filtered = filtered.filter((resource) => resource.type === selectedType);
    }

    setFilteredResources(filtered);
  }, [searchTerm, selectedCategory, selectedType, resources]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category filter change
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  // Handle resource type filter change
  const handleTypeFilter = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="library-page">
      <NavBar />
      <div className="library-container">
        <h1 className="library-title">Digital Library</h1>
        <p className="library-subtitle">
          Discover a world of knowledge with our extensive collection of
          resources
        </p>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search by title, author, or keywords..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-button">
            <i className="fa fa-search"></i>
            Search
          </button>
        </div>

        {/* Filter Sections */}
        <div className="filter-container">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="filter-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-button ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Resource Type</h3>
            <div className="filter-buttons">
              {resourceTypes.map((type) => (
                <button
                  key={type}
                  className={`filter-button ${
                    selectedType === type ? "active" : ""
                  }`}
                  onClick={() => handleTypeFilter(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resource Feed */}
        <div className="resource-feed">
          <h2 className="feed-title">
            {filteredResources.length === 0
              ? "No resources found"
              : `Found ${filteredResources.length} resources`}
          </h2>

          <div className="resource-grid">
            {filteredResources.map((resource) => (
              <div className="resource-card" key={resource.id}>
                <div className="resource-image">
                  <img src={resource.coverImage} alt={resource.title} />
                </div>
                <div className="resource-details">
                  <h3 className="resource-title">{resource.title}</h3>
                  <p className="resource-author">By {resource.author}</p>
                  <div className="resource-meta">
                    <span className="resource-type">{resource.type}</span>
                    <span className="resource-category">
                      {resource.category}
                    </span>
                  </div>
                  <p className="resource-description">{resource.description}</p>
                  <div className="resource-actions">
                    <button className="action-button view">View Details</button>
                    <button className="action-button borrow">Borrow</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;