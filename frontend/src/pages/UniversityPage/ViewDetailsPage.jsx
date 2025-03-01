import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./ViewDetailsPage.css";

// Sample universities data (in a real app, this would come from an API)
const universities = [
  {
    id: 1,
    name: "Harvard University",
    location: "Cambridge, Massachusetts, USA",
    ranking: "#5 World University Rankings 2023",
    type: "Private Research",
    founded: 1636,
    students: 23000,
    acceptance: "4.6%",
    image:
      "https://images.unsplash.com/photo-1580758523375-88b292663f7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    description:
      "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Established in 1636 and named for its first benefactor, clergyman John Harvard, Harvard is the oldest institution of higher learning in the United States and among the most prestigious in the world.",
    facilities: [
      "Library System with 20+ million volumes",
      "Harvard Art Museums",
      "Harvard Museum of Natural History",
      "Science Center",
      "Recreational Athletic Complex",
    ],
    tuition: "$54,768 per year",
    endowment: "$50.9 billion",
    achievements: [
      "8 U.S. Presidents are Harvard graduates",
      "160+ Nobel laureates",
      "14 Turing Award winners",
    ],
    campusSize: "5,457 acres",
    studentLife:
      "Harvard offers over 400 student organizations, ranging from cultural and political groups to community service programs.",
    history:
      "Founded in 1636, Harvard is the oldest institution of higher education in the United States. Originally established to train Congregational and Unitarian clergy, it has evolved to become one of the world's most prestigious universities.",
    researchCenters: [
      "Radcliffe Institute for Advanced Study",
      "Harvard Forest",
      "Center for Astrophysics",
      "Broad Institute",
      "Stem Cell Institute",
    ],
  },
  {
    id: 2,
    name: "Stanford University",
    location: "Stanford, California, USA",
    ranking: "#3 World University Rankings 2023",
    type: "Private Research",
    founded: 1885,
    students: 17000,
    acceptance: "4.3%",
    image:
      "https://images.unsplash.com/photo-1602303991531-d4ecbf0f11f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    description:
      "Stanford University, officially Leland Stanford Junior University, is a private research university in Stanford, California. The university was founded in 1885 by Leland and Jane Stanford in memory of their only child, Leland Stanford Jr., who had died of typhoid fever at age 15 the previous year.",
    facilities: [
      "Green Library",
      "Cantor Arts Center",
      "Stanford Medical Center",
      "Stanford Stadium",
      "Outdoor Recreation Center",
    ],
    tuition: "$56,169 per year",
    endowment: "$36.3 billion",
    achievements: [
      "85+ Nobel laureates",
      "29 Turing Award winners",
      "8 Fields Medalists",
    ],
    campusSize: "8,180 acres",
    studentLife:
      "Stanford offers more than 600 organized student groups, including social, athletic, service, cultural, academic, religious, and political organizations.",
    history:
      "Stanford was founded in 1885 by Leland Stanford, former Governor of and U.S. Senator from California and railroad tycoon, and his wife, Jane, in memory of their only child, Leland Stanford Jr., who had died of typhoid fever at age 15.",
    researchCenters: [
      "SLAC National Accelerator Laboratory",
      "Stanford Humanities Center",
      "Stanford Bio-X",
      "Stanford Woods Institute for the Environment",
      "Stanford Institute for Economic Policy Research",
    ],
  },
  {
    id: 3,
    name: "Massachusetts Institute of Technology",
    location: "Cambridge, Massachusetts, USA",
    ranking: "#1 World University Rankings 2023",
    type: "Private Research",
    founded: 1861,
    students: 11500,
    acceptance: "6.7%",
    image:
      "https://images.unsplash.com/photo-1508431810240-e291d4393b58?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    description:
      "The Massachusetts Institute of Technology (MIT) is a private land-grant research university in Cambridge, Massachusetts. Established in 1861, MIT has played a significant role in the development of many areas of modern technology and science.",
    facilities: [
      "MIT Libraries",
      "MIT Museum",
      "Ray and Maria Stata Center",
      "MIT.nano",
      "Kresge Auditorium",
    ],
    tuition: "$55,510 per year",
    endowment: "$24.6 billion",
    achievements: [
      "98 Nobel laureates",
      "26 Turing Award winners",
      "8 Fields Medalists",
    ],
    campusSize: "168 acres",
    studentLife:
      "MIT is home to more than 500 recognized student activity groups, including academic clubs, athletic teams, and artistic groups.",
    history:
      "MIT was founded in response to the increasing industrialization of the United States. The institute adopted a European polytechnic university model and emphasized laboratory instruction in applied science and engineering.",
    researchCenters: [
      "Koch Institute for Integrative Cancer Research",
      "MIT Media Lab",
      "Computer Science and Artificial Intelligence Laboratory",
      "Lincoln Laboratory",
      "Research Laboratory of Electronics",
    ],
  },
];

const ViewDetailsPage = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("history");

  useEffect(() => {
    // In a real application, you would fetch the university data from an API
    // For this demo, we'll use the sample data
    const universityData = universities.find((uni) => uni.id === parseInt(id));

    if (universityData) {
      setUniversity(universityData);
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="view-details-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading university details...</p>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="view-details-page">
        <Navbar />
        <div className="error-container">
          <h2>University Not Found</h2>
          <p>Sorry, we couldn't find the university you're looking for.</p>
          <Link to="/university" className="back-button">
            Back to Universities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="view-details-page">
      <Navbar />

      <div
        className="details-header"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${university.image})`,
        }}
      >
        <div className="details-header-content">
          <h1>{university.name} - Detailed View</h1>
          <nav className="breadcrumbs">
            <Link to="/university">Universities</Link> &gt;
            <Link to={`/university/${university.id}`}>
              {university.name}
            </Link>{" "}
            &gt;
            <span>Detailed View</span>
          </nav>
        </div>
      </div>

      <div className="details-container">
        <div className="details-sidebar">
          <div className="sidebar-nav">
            <button
              className={activeSection === "history" ? "active" : ""}
              onClick={() => setActiveSection("history")}
            >
              History
            </button>
            <button
              className={activeSection === "achievements" ? "active" : ""}
              onClick={() => setActiveSection("achievements")}
            >
              Achievements
            </button>
            <button
              className={activeSection === "campus" ? "active" : ""}
              onClick={() => setActiveSection("campus")}
            >
              Campus
            </button>
            <button
              className={activeSection === "research" ? "active" : ""}
              onClick={() => setActiveSection("research")}
            >
              Research
            </button>
            <button
              className={activeSection === "student-life" ? "active" : ""}
              onClick={() => setActiveSection("student-life")}
            >
              Student Life
            </button>
          </div>

          <div className="quick-links">
            <h3>Quick Links</h3>
            <Link to={`/university/${university.id}/programs`}>
              Programs & Courses
            </Link>
            <Link to={`/university/${university.id}/faculty`}>
              Faculty & Staff
            </Link>
            <Link to={`/university/${university.id}/virtual-tour`}>
              Virtual Campus Tour
            </Link>
            <Link to={`/university/${university.id}`}>Overview</Link>
          </div>
        </div>

        <div className="details-content">
          {activeSection === "history" && (
            <div className="details-section">
              <h2>History</h2>
              <div className="section-content">
                <p>{university.history}</p>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h3>{university.founded}</h3>
                      <p>University founded</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h3>{university.founded + 50}</h3>
                      <p>First major expansion</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h3>{university.founded + 100}</h3>
                      <p>Centennial celebration</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h3>Present</h3>
                      <p>Current status</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "achievements" && (
            <div className="details-section">
              <h2>Notable Achievements</h2>
              <div className="section-content">
                <div className="achievement-cards">
                  {university.achievements.map((achievement, index) => (
                    <div key={index} className="achievement-card">
                      <div className="achievement-icon">
                        <i className="fas fa-trophy"></i>
                      </div>
                      <div className="achievement-text">{achievement}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "campus" && (
            <div className="details-section">
              <h2>Campus & Facilities</h2>
              <div className="section-content">
                <div className="campus-info">
                  <div className="campus-size">
                    <h3>Campus Size</h3>
                    <p>{university.campusSize}</p>
                  </div>
                  <div className="campus-buildings">
                    <h3>Key Facilities</h3>
                    <ul>
                      {university.facilities.map((facility, index) => (
                        <li key={index}>{facility}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="campus-gallery">
                  <div
                    className="gallery-image"
                    style={{
                      backgroundImage: `url(https://source.unsplash.com/random/300x200?university,campus,1)`,
                    }}
                  ></div>
                  <div
                    className="gallery-image"
                    style={{
                      backgroundImage: `url(https://source.unsplash.com/random/300x200?university,campus,2)`,
                    }}
                  ></div>
                  <div
                    className="gallery-image"
                    style={{
                      backgroundImage: `url(https://source.unsplash.com/random/300x200?university,campus,3)`,
                    }}
                  ></div>
                  <div
                    className="gallery-image"
                    style={{
                      backgroundImage: `url(https://source.unsplash.com/random/300x200?university,campus,4)`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "research" && (
            <div className="details-section">
              <h2>Research Centers</h2>
              <div className="section-content">
                <div className="research-centers">
                  {university.researchCenters.map((center, index) => (
                    <div key={index} className="research-center-card">
                      <h3>{center}</h3>
                      <p>
                        World-class research in specialized fields contributing
                        to global knowledge and innovation.
                      </p>
                      <a href="#" className="learn-more">
                        Learn More
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "student-life" && (
            <div className="details-section">
              <h2>Student Life</h2>
              <div className="section-content">
                <p>{university.studentLife}</p>
                <div className="student-life-features">
                  <div className="feature">
                    <div className="feature-icon">
                      <i className="fas fa-users"></i>
                    </div>
                    <h3>Clubs & Organizations</h3>
                    <p>
                      Join over 400 student-run clubs and organizations covering
                      academic, cultural, athletic, and social interests.
                    </p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">
                      <i className="fas fa-home"></i>
                    </div>
                    <h3>Housing</h3>
                    <p>
                      Explore on-campus residence halls and off-campus housing
                      options for a complete university experience.
                    </p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">
                      <i className="fas fa-utensils"></i>
                    </div>
                    <h3>Dining</h3>
                    <p>
                      Choose from various dining halls, cafés, and restaurants
                      across campus offering diverse cuisine options.
                    </p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon">
                      <i className="fas fa-heart"></i>
                    </div>
                    <h3>Health & Wellness</h3>
                    <p>
                      Access comprehensive health services, counseling, and
                      recreational facilities to maintain your well-being.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="back-to-university">
        <Link to={`/university/${university.id}`} className="back-button">
          <i className="fas fa-arrow-left"></i> Back to University Overview
        </Link>
      </div>
    </div>
  );
};

export default ViewDetailsPage;
