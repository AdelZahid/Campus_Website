import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./UniversityPage.css";

const UniversityPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("universities");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUniversities, setFilteredUniversities] =
    useState(universities);
  const [filteredPrograms, setFilteredPrograms] = useState(programs);
  const [selectedFilters, setSelectedFilters] = useState({
    country: "all",
    ranking: "all",
    type: "all",
  });

  useEffect(() => {
    applyFilters();
  }, [selectedFilters, searchTerm, activeTab]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const applyFilters = () => {
    // Filter universities
    let filtered = universities;

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(
        (uni) =>
          uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          uni.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          uni.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply country filter
    if (selectedFilters.country !== "all") {
      filtered = filtered.filter(
        (uni) => uni.country === selectedFilters.country
      );
    }

    // Apply ranking filter
    if (selectedFilters.ranking !== "all") {
      if (selectedFilters.ranking === "top10") {
        filtered = filtered.filter((uni) => uni.rankNumber <= 10);
      } else if (selectedFilters.ranking === "top50") {
        filtered = filtered.filter((uni) => uni.rankNumber <= 50);
      } else if (selectedFilters.ranking === "top100") {
        filtered = filtered.filter((uni) => uni.rankNumber <= 100);
      }
    }

    // Apply type filter
    if (selectedFilters.type !== "all") {
      filtered = filtered.filter((uni) => uni.type === selectedFilters.type);
    }

    setFilteredUniversities(filtered);

    // Filter programs
    let filteredProgs = programs;
    if (searchTerm) {
      filteredProgs = filteredProgs.filter(
        (prog) =>
          prog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prog.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prog.university.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPrograms(filteredProgs);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const viewUniversityDetails = (id) => {
    navigate(`/university/${id}`);
  };

  const UniversityCard = ({ university, navigate }) => {
    return (
      <Link to={`/university/${university.id}`} className="university-card">
        <div
          className="university-image"
          style={{ backgroundImage: `url(${university.image})` }}
        >
          <div className="university-ranking">{university.ranking}</div>
        </div>
        <div className="university-content">
          <h3>{university.name}</h3>
          <div className="university-meta">
            <span>
              <i className="fas fa-map-marker-alt"></i> {university.location}
            </span>
            <span>
              <i className="fas fa-users"></i>{" "}
              {university.students.toLocaleString()} students
            </span>
          </div>
          <p>{university.description.substring(0, 150)}...</p>
          <div className="university-actions">
            <button className="view-details-btn">View Details</button>
            <button className="save-btn">
              <i className="far fa-bookmark"></i> Save
            </button>
          </div>
        </div>
      </Link>
    );
  };

  const UniversityList = ({ universities, navigate }) => {
    return (
      <div className="universities-list">
        {universities.map((university) => (
          <UniversityCard
            key={university.id}
            university={university}
            navigate={navigate}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="university-page">
      <Navbar />
      <div className="university-hero">
        <div className="hero-content">
          <h1>Find Your Perfect University</h1>
          <p>Explore top universities and programs to build your future</p>
          <div className="search-container">
            <input
              type="text"
              placeholder={
                activeTab === "universities"
                  ? "Search universities..."
                  : "Search programs..."
              }
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search"
            />
            <button>
              <i className="fas fa-search"></i>Search
            </button>
          </div>
        </div>
      </div>

      <div className="university-container">
        <div className="tabs-container">
          <button
            className={`tab-button ${
              activeTab === "universities" ? "active" : ""
            }`}
            onClick={() => setActiveTab("universities")}
          >
            Universities
          </button>
          <button
            className={`tab-button ${activeTab === "programs" ? "active" : ""}`}
            onClick={() => setActiveTab("programs")}
          >
            Programs
          </button>
          <button
            className={`tab-button ${activeTab === "events" ? "active" : ""}`}
            onClick={() => setActiveTab("events")}
          >
            Events
          </button>
        </div>

        {/* Universities Tab */}
        {activeTab === "universities" && (
          <>
            <div className="filters-container">
              <div className="filter">
                <label>Country:</label>
                <select
                  value={selectedFilters.country}
                  onChange={(e) =>
                    handleFilterChange("country", e.target.value)
                  }
                >
                  <option value="all">All Countries</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                </select>
              </div>
              <div className="filter">
                <label>Ranking:</label>
                <select
                  value={selectedFilters.ranking}
                  onChange={(e) =>
                    handleFilterChange("ranking", e.target.value)
                  }
                >
                  <option value="all">All Rankings</option>
                  <option value="top10">Top 10</option>
                  <option value="top50">Top 50</option>
                  <option value="top100">Top 100</option>
                </select>
              </div>
              <div className="filter">
                <label>Type:</label>
                <select
                  value={selectedFilters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>

            <UniversityList
              universities={filteredUniversities}
              navigate={navigate}
            />
          </>
        )}

        {activeTab === "programs" && (
          <div className="programs-grid">
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program) => (
                <div className="program-card" key={program.id}>
                  <div className="program-level">{program.level}</div>
                  <h3 className="program-name">{program.name}</h3>
                  <p className="program-university">{program.university}</p>
                  <p className="program-duration">
                    <i className="far fa-clock"></i> {program.duration}
                  </p>
                  <button className="program-details-button">
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <div className="no-results">
                <h3>No programs match your search</h3>
                <p>Try adjusting your search term</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "events" && (
          <div className="events-grid">
            {events.length > 0 ? (
              events.map((event) => (
                <div className="event-card" key={event.id}>
                  <div className="event-date">
                    <span className="event-month">{event.month}</span>
                    <span className="event-day">{event.day}</span>
                  </div>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-university">{event.university}</p>
                  <div className="event-details">
                    <span>
                      <i className="fas fa-map-marker-alt"></i> {event.location}
                    </span>
                    <span>
                      <i className="fas fa-clock"></i> {event.time}
                    </span>
                  </div>
                  <button className="event-register-button">Register</button>
                </div>
              ))
            ) : (
              <div className="no-results">
                <h3>No events found</h3>
                <p>Check back later for upcoming events</p>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

// Sample university data
const universities = [
  {
    id: 1,
    name: "Harvard University",
    location: "Cambridge, MA",
    country: "USA",
    ranking: "#1 in National Universities",
    rankNumber: 1,
    type: "private",
    description:
      "Founded in 1636, Harvard is America's oldest institution of higher education and consistently ranks among the top universities in the world.",
    programs: 225,
    students: 22250,
    acceptance: "4%",
    image: "https://via.placeholder.com/800x400?text=Harvard+University",
    courses: [
      { id: 1, name: "Computer Science", department: "Engineering" },
      { id: 2, name: "Economics", department: "Business" },
      { id: 3, name: "Law", department: "Law" },
    ],
    events: [
      { id: 1, name: "Harvard Innovators Summit", date: "2023-05-15" },
      { id: 2, name: "Alumni Networking Event", date: "2023-06-20" },
    ],
  },
  {
    id: 2,
    name: "Stanford University",
    location: "Stanford, CA",
    country: "USA",
    ranking: "#2 in National Universities",
    rankNumber: 2,
    type: "private",
    description:
      "Stanford University is one of the world's leading research and teaching institutions, dedicated to finding solutions to big challenges.",
    programs: 195,
    students: 16520,
    acceptance: "4.3%",
    image: "https://via.placeholder.com/800x400?text=Stanford+University",
    courses: [
      { id: 1, name: "Computer Science", department: "Engineering" },
      { id: 2, name: "Business Administration", department: "Business" },
    ],
    events: [{ id: 1, name: "Tech Innovation Summit", date: "2023-07-12" }],
  },
  {
    id: 3,
    name: "MIT",
    location: "Cambridge, MA",
    country: "USA",
    ranking: "#3 in National Universities",
    rankNumber: 3,
    type: "private",
    description:
      "The Massachusetts Institute of Technology is a private research university renowned for research and education in physical sciences and engineering.",
    programs: 180,
    students: 11520,
    acceptance: "6.7%",
    image: "https://via.placeholder.com/800x400?text=MIT",
    courses: [
      { id: 1, name: "Electrical Engineering", department: "Engineering" },
      { id: 2, name: "Quantum Physics", department: "Science" },
    ],
    events: [{ id: 1, name: "Engineering Fair", date: "2023-05-28" }],
  },
  {
    id: 4,
    name: "University of California Berkeley",
    location: "Berkeley, CA",
    country: "USA",
    ranking: "#4 in Public Universities",
    rankNumber: 4,
    type: "public",
    description:
      "UC Berkeley is a public research university with a mission of teaching, research and public service.",
    programs: 150,
    students: 42450,
    acceptance: "16%",
    image: "https://via.placeholder.com/800x400?text=UC+Berkeley",
    courses: [
      { id: 1, name: "Data Science", department: "Science" },
      { id: 2, name: "Psychology", department: "Social Sciences" },
    ],
    events: [{ id: 1, name: "Career Fair", date: "2023-09-15" }],
  },
  {
    id: 5,
    name: "University of Oxford",
    location: "Oxford",
    country: "UK",
    ranking: "#1 in UK Universities",
    rankNumber: 5,
    type: "public",
    description:
      "Oxford is a collegiate research university in Oxford, England. It has the oldest university in the English-speaking world.",
    programs: 250,
    students: 24000,
    acceptance: "17.5%",
    image: "https://via.placeholder.com/800x400?text=University+of+Oxford",
    courses: [
      { id: 1, name: "Philosophy", department: "Humanities" },
      { id: 2, name: "English Literature", department: "Humanities" },
    ],
    events: [{ id: 1, name: "Oxford Debate", date: "2023-06-10" }],
  },
  {
    id: 6,
    name: "University of Toronto",
    location: "Toronto",
    country: "Canada",
    ranking: "#1 in Canadian Universities",
    rankNumber: 18,
    type: "public",
    description:
      "The University of Toronto is a public research university in Toronto, Canada, founded in 1827.",
    programs: 700,
    students: 74000,
    acceptance: "43%",
    image: "https://via.placeholder.com/800x400?text=University+of+Toronto",
    courses: [
      { id: 1, name: "Medicine", department: "Health Sciences" },
      { id: 2, name: "Architecture", department: "Design" },
    ],
    events: [{ id: 1, name: "Research Symposium", date: "2023-07-22" }],
  },
  {
    id: 7,
    name: "Technical University of Munich",
    location: "Munich",
    country: "Germany",
    ranking: "#1 in German Technical Universities",
    rankNumber: 38,
    type: "public",
    description:
      "TUM is a research university with campuses in Munich, Garching, and Freising-Weihenstephan.",
    programs: 176,
    students: 48000,
    acceptance: "20%",
    image: "https://via.placeholder.com/800x400?text=TU+Munich",
    courses: [
      { id: 1, name: "Mechanical Engineering", department: "Engineering" },
      { id: 2, name: "Computer Science", department: "Informatics" },
    ],
    events: [{ id: 1, name: "Oktoberfest Science Fair", date: "2023-09-25" }],
  },
  {
    id: 8,
    name: "University of Melbourne",
    location: "Melbourne",
    country: "Australia",
    ranking: "#1 in Australian Universities",
    rankNumber: 33,
    type: "public",
    description:
      "The University of Melbourne is a public research university founded in 1853, the second oldest in Australia.",
    programs: 270,
    students: 52000,
    acceptance: "70%",
    image: "https://via.placeholder.com/800x400?text=University+of+Melbourne",
    courses: [
      { id: 1, name: "Environmental Science", department: "Science" },
      { id: 2, name: "Fine Arts", department: "Arts" },
    ],
    events: [{ id: 1, name: "Cultural Festival", date: "2023-08-12" }],
  },
];

// Sample programs data
const programs = [
  {
    id: 1,
    name: "Computer Science",
    university: "Harvard University",
    level: "Bachelor's",
    duration: "4 years",
    description:
      "A comprehensive program covering algorithms, systems, and computational theory.",
  },
  {
    id: 2,
    name: "Business Administration",
    university: "Stanford University",
    level: "Master's",
    duration: "2 years",
    description:
      "Build leadership skills and business acumen through case studies and practical projects.",
  },
  {
    id: 3,
    name: "Mechanical Engineering",
    university: "MIT",
    level: "Bachelor's",
    duration: "4 years",
    description:
      "Study the design, manufacturing, and operation of mechanical systems.",
  },
  {
    id: 4,
    name: "Data Science",
    university: "UC Berkeley",
    level: "Master's",
    duration: "1.5 years",
    description:
      "Learn to analyze large datasets and derive meaningful insights.",
  },
  {
    id: 5,
    name: "International Relations",
    university: "University of Oxford",
    level: "PhD",
    duration: "3-4 years",
    description: "Research global politics, economics, and international law.",
  },
  {
    id: 6,
    name: "Medicine",
    university: "University of Toronto",
    level: "Doctorate",
    duration: "4 years",
    description: "Comprehensive medical education with clinical rotations.",
  },
  {
    id: 7,
    name: "Artificial Intelligence",
    university: "Technical University of Munich",
    level: "Master's",
    duration: "2 years",
    description:
      "Focus on machine learning, robotics, and intelligent systems.",
  },
  {
    id: 8,
    name: "Environmental Science",
    university: "University of Melbourne",
    level: "Bachelor's",
    duration: "3 years",
    description: "Study ecosystems, conservation, and sustainable development.",
  },
];

// Sample events data
const events = [
  {
    id: 1,
    title: "Harvard Innovators Summit",
    university: "Harvard University",
    month: "May",
    day: "15",
    location: "Harvard Campus",
    time: "10:00 AM - 4:00 PM",
    description:
      "Join industry leaders and innovators for a day of inspiration and networking.",
  },
  {
    id: 2,
    title: "Tech Career Fair",
    university: "Stanford University",
    month: "Jun",
    day: "22",
    location: "Stanford Memorial Hall",
    time: "11:00 AM - 3:00 PM",
    description:
      "Meet representatives from top tech companies and explore career opportunities.",
  },
  {
    id: 3,
    title: "Engineering Research Expo",
    university: "MIT",
    month: "Jul",
    day: "10",
    location: "MIT Engineering Complex",
    time: "9:00 AM - 6:00 PM",
    description:
      "Discover cutting-edge research projects from MIT's engineering departments.",
  },
  {
    id: 4,
    title: "Global Health Symposium",
    university: "UC Berkeley",
    month: "Aug",
    day: "05",
    location: "Berkeley Health Sciences Building",
    time: "10:00 AM - 5:00 PM",
    description:
      "Explore challenges and innovations in global health with leading experts.",
  },
  {
    id: 5,
    title: "Oxford Debate Championship",
    university: "University of Oxford",
    month: "Sep",
    day: "18",
    location: "Oxford Union",
    time: "2:00 PM - 8:00 PM",
    description:
      "Witness the battle of wits as top debaters compete for the championship title.",
  },
  {
    id: 6,
    title: "International Student Welcome Day",
    university: "University of Toronto",
    month: "Sep",
    day: "01",
    location: "Toronto University Center",
    time: "10:00 AM - 4:00 PM",
    description:
      "Welcome event for international students with orientation activities and resources.",
  },
];

export default UniversityPage;
