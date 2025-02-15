import React, { useState } from "react";
import "./LibraryPage.css";

const librarySections = {
  Arts: ["Painting", "Sculpture", "Literature"],
  Science: ["Engineering", "Medical", "Biology", "Physics", "Chemistry"],
  Commerce: ["Accounting", "Marketing", "Finance"],
  History: ["Ancient", "Medieval", "Modern"],
  "Research Papers & Articles": ["Technology", "Health", "Social Studies"],
};

const booksData = {
  Engineering: ["Mechanical Design", "Civil Structures", "AI & Robotics"],
  Medical: ["Human Anatomy", "Pharmacology", "Medical Ethics"],
  Biology: ["Genetics", "Microbiology", "Ecology"],
  Physics: ["Quantum Mechanics", "Astrophysics", "Thermodynamics"],
  Chemistry: ["Organic Chemistry", "Chemical Reactions", "Polymer Science"],
};

const LibraryPage = () => {
  const [openSection, setOpenSection] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDonateForm, setShowDonateForm] = useState(false);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
    setSelectedCategory(null);
    setSearchTerm("");
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  const handleDonateBooks = () => {
    setShowDonateForm(true);
  };

  const handleBuyBooks = () => {
    // Handle book buying logic here (e.g., redirect to a marketplace)
  };

  return (
    <div className="library-container">
      <h1>Library Page</h1>

      <div className="sidebar">
        <button className="btn" onClick={() => setShowDonateForm(false)}>
          Your Books
        </button>
        <button className="btn" onClick={handleDonateBooks}>
          Donate Books
        </button>
        <button className="btn" onClick={handleBuyBooks}>
          Buy Books
        </button>
      </div>

      {/* Donate Books Form */}
      {showDonateForm && (
        <div className="donate-form">
          <h2>Donate a Book</h2>
          <form>
            <label>
              Book Title:
              <input type="text" required />
            </label>
            <label>
              Author:
              <input type="text" required />
            </label>
            <label>
              Genre:
              <input type="text" required />
            </label>
            <label>
              Year of Publication:
              <input type="number" required />
            </label>
            <label>
              Condition:
              <input type="text" required />
            </label>
            <label>
              ISBN:
              <input type="text" required />
            </label>
            <label>
              Description:
              <textarea required></textarea>
            </label>
            <label>
              Your Name:
              <input type="text" required />
            </label>
            <label>
              Your Email:
              <input type="email" required />
            </label>
            <label>
              Pickup Location:
              <input type="text" required />
            </label>
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Sections for Categories */}
      <div className="sections">
        {Object.keys(librarySections).map((section) => (
          <div key={section} className="section">
            <button
              className="section-title"
              onClick={() => toggleSection(section)}
            >
              {section} {openSection === section ? "▲" : "▼"}
            </button>
            {openSection === section && (
              <div className="subcategories">
                {librarySections[section].map((subcategory) => (
                  <button
                    key={subcategory}
                    className={`subcategory ${
                      selectedCategory === subcategory ? "active" : ""
                    }`}
                    onClick={() => selectCategory(subcategory)}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Books Section */}
      {selectedCategory && (
        <div className="books-section">
          <h2>{selectedCategory} Books</h2>
          <input
            type="text"
            placeholder="Search books..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="book-list">
            {booksData[selectedCategory]
              .filter((book) =>
                book.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((book) => (
                <li key={book}>{book}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
