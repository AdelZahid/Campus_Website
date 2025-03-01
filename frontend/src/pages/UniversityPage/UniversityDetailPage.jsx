import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./UniversityDetailPage.css";
import Footer from "../../components/Footer/Footer"; //Import Footer component

const UniversityDetailPage = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

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
      <div className="university-detail-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading university information...</p>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="university-detail-page">
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
    <div className="university-detail-page">
      <Navbar />
      <div
        className="university-header"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${university.image})`,
        }}
      >
        <div className="university-header-content">
          <h1>{university.name}</h1>
          <div className="university-header-meta">
            <span>
              <i className="fas fa-map-marker-alt"></i> {university.location}
            </span>
            <span>
              <i className="fas fa-trophy"></i> {university.ranking}
            </span>
            <span>
              <i className="fas fa-building"></i> {university.type} University
            </span>
          </div>
          <button className="apply-now-button">Apply Now</button>
        </div>
      </div>
      <div className="university-detail-container">
        <div className="university-detail-sidebar">
          <div className="detail-navigation">
            <h3>University Pages</h3>
            <ul>
              <li>
                <Link to={`/university/${university.id}/details`}>
                  <i className="fas fa-info-circle"></i>
                  Detailed View
                </Link>
              </li>
              <li>
                <Link to={`/university/${university.id}/programs`}>
                  <i className="fas fa-book"></i>
                  Programs & Courses
                </Link>
              </li>
              <li>
                <Link to={`/university/${university.id}/faculty`}>
                  <i className="fas fa-chalkboard-teacher"></i>
                  Faculty & Staff
                </Link>
              </li>
              <li>
                <Link to={`/university/${university.id}/virtual-tour`}>
                  <i className="fas fa-vr-cardboard"></i>
                  Virtual Campus Tour
                </Link>
              </li>
            </ul>
          </div>

          <div className="quick-facts">
            <h3>Quick Facts</h3>
            <ul>
              <li>
                <span className="fact-label">Founded</span>
                <span className="fact-value">1636</span>
              </li>
              <li>
                <span className="fact-label">Total Students</span>
                <span className="fact-value">
                  {university.students.toLocaleString()}
                </span>
              </li>
              <li>
                <span className="fact-label">Acceptance Rate</span>
                <span className="fact-value">{university.acceptance}</span>
              </li>
              <li>
                <span className="fact-label">Programs</span>
                <span className="fact-value">{university.programs}</span>
              </li>
              <li>
                <span className="fact-label">Student-Faculty Ratio</span>
                <span className="fact-value">6:1</span>
              </li>
              <li>
                <span className="fact-label">Campus Size</span>
                <span className="fact-value">5,076 acres</span>
              </li>
            </ul>
          </div>

          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>
              <i className="fas fa-phone"></i> +1 (123) 456-7890
            </p>
            <p>
              <i className="fas fa-envelope"></i> admissions@
              {university.name.toLowerCase().replace(/\s+/g, "")}.edu
            </p>
            <p>
              <i className="fas fa-globe"></i> www.
              {university.name.toLowerCase().replace(/\s+/g, "")}.edu
            </p>
          </div>

          <div className="virtual-tour">
            <h3>Take a Virtual Tour</h3>
            <div className="tour-preview">
              <img
                src="https://via.placeholder.com/300x200?text=Virtual+Tour"
                alt="Virtual Tour"
              />
              <button className="tour-button">
                <i className="fas fa-play-circle"></i> Start Tour
              </button>
            </div>
          </div>
        </div>

        <div className="university-detail-main">
          <div className="university-tabs">
            <button
              className={`tab-button ${
                activeTab === "overview" ? "active" : ""
              }`}
              onClick={() => setActiveTab("overview")}
            >
              <i className="fas fa-info-circle"></i> Overview
            </button>
            <button
              className={`tab-button ${
                activeTab === "programs" ? "active" : ""
              }`}
              onClick={() => setActiveTab("programs")}
            >
              <i className="fas fa-graduation-cap"></i> Programs
            </button>
            <button
              className={`tab-button ${
                activeTab === "admissions" ? "active" : ""
              }`}
              onClick={() => setActiveTab("admissions")}
            >
              <i className="fas fa-file-alt"></i> Admissions
            </button>
            <button
              className={`tab-button ${activeTab === "campus" ? "active" : ""}`}
              onClick={() => setActiveTab("campus")}
            >
              <i className="fas fa-university"></i> Campus Life
            </button>
            <button
              className={`tab-button ${activeTab === "events" ? "active" : ""}`}
              onClick={() => setActiveTab("events")}
            >
              <i className="fas fa-calendar-alt"></i> Events
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "overview" && (
              <div className="overview-tab">
                <h2>About {university.name}</h2>
                <p className="university-description">
                  {university.description}
                </p>
                <p>
                  At {university.name}, we are committed to excellence in
                  education, research, and innovation. Our diverse community of
                  scholars and students is dedicated to pushing the boundaries
                  of knowledge and making a positive impact on the world.
                </p>

                <h3>Mission Statement</h3>
                <p>
                  To advance knowledge and educate students in science,
                  technology, and other areas of scholarship that will best
                  serve the nation and the world in the 21st century.
                </p>

                <h3>Why Choose {university.name}?</h3>
                <div className="benefits-grid">
                  <div className="benefit">
                    <i className="fas fa-graduation-cap"></i>
                    <h4>World-Class Education</h4>
                    <p>
                      Learn from renowned faculty and researchers at the
                      forefront of their fields.
                    </p>
                  </div>
                  <div className="benefit">
                    <i className="fas fa-globe"></i>
                    <h4>Global Network</h4>
                    <p>
                      Join a global community of alumni and partners across
                      industries and continents.
                    </p>
                  </div>
                  <div className="benefit">
                    <i className="fas fa-flask"></i>
                    <h4>Research Opportunities</h4>
                    <p>
                      Engage in groundbreaking research and contribute to
                      solving real-world problems.
                    </p>
                  </div>
                  <div className="benefit">
                    <i className="fas fa-users"></i>
                    <h4>Diverse Community</h4>
                    <p>
                      Thrive in an inclusive environment that values different
                      perspectives and experiences.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "programs" && (
              <div className="programs-tab">
                <h2>Academic Programs</h2>
                <p>
                  Explore our diverse range of undergraduate and graduate
                  programs designed to prepare you for success in your chosen
                  field.
                </p>

                <div className="program-categories">
                  <div className="category">
                    <h3>Undergraduate Programs</h3>
                    <ul className="programs-list">
                      {university.courses.map((course) => (
                        <li key={course.id} className="program-item">
                          <div className="program-info">
                            <h4>{course.name}</h4>
                            <p>Department: {course.department}</p>
                          </div>
                          <button className="program-details-btn">
                            Details
                          </button>
                        </li>
                      ))}
                      <li className="program-item">
                        <div className="program-info">
                          <h4>Liberal Arts</h4>
                          <p>Department: Humanities</p>
                        </div>
                        <button className="program-details-btn">Details</button>
                      </li>
                      <li className="program-item">
                        <div className="program-info">
                          <h4>Biology</h4>
                          <p>Department: Sciences</p>
                        </div>
                        <button className="program-details-btn">Details</button>
                      </li>
                    </ul>
                  </div>

                  <div className="category">
                    <h3>Graduate Programs</h3>
                    <ul className="programs-list">
                      <li className="program-item">
                        <div className="program-info">
                          <h4>MBA</h4>
                          <p>Department: Business</p>
                        </div>
                        <button className="program-details-btn">Details</button>
                      </li>
                      <li className="program-item">
                        <div className="program-info">
                          <h4>Computer Science (MS)</h4>
                          <p>Department: Engineering</p>
                        </div>
                        <button className="program-details-btn">Details</button>
                      </li>
                      <li className="program-item">
                        <div className="program-info">
                          <h4>Public Health (MPH)</h4>
                          <p>Department: Health Sciences</p>
                        </div>
                        <button className="program-details-btn">Details</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "admissions" && (
              <div className="admissions-tab">
                <h2>Admissions</h2>
                <p>
                  Join our vibrant community of scholars and innovators. Here's
                  what you need to know about applying to {university.name}.
                </p>

                <div className="admission-stats">
                  <div className="stat-card">
                    <h3>Acceptance Rate</h3>
                    <div className="stat-value">{university.acceptance}</div>
                    <p>Highly competitive</p>
                  </div>
                  <div className="stat-card">
                    <h3>Application Deadline</h3>
                    <div className="stat-value">Jan 1</div>
                    <p>Early Action: Nov 1</p>
                  </div>
                  <div className="stat-card">
                    <h3>Average GPA</h3>
                    <div className="stat-value">3.9</div>
                    <p>On a 4.0 scale</p>
                  </div>
                  <div className="stat-card">
                    <h3>Application Fee</h3>
                    <div className="stat-value">$75</div>
                    <p>Fee waivers available</p>
                  </div>
                </div>

                <h3>Application Requirements</h3>
                <ul className="requirements-list">
                  <li>Completed application form</li>
                  <li>Official high school transcripts</li>
                  <li>SAT or ACT scores (optional for 2023-2024)</li>
                  <li>Two letters of recommendation</li>
                  <li>Personal essay</li>
                  <li>Application fee or fee waiver</li>
                </ul>

                <div className="application-buttons">
                  <button className="apply-button">Start Application</button>
                  <button className="info-button">Request Information</button>
                </div>

                <h3>Financial Aid & Scholarships</h3>
                <p>
                  We are committed to meeting 100% of demonstrated financial
                  need for all admitted students. Our need-blind admissions
                  process ensures that your financial situation does not affect
                  your chances of admission.
                </p>
                <button className="financial-aid-button">
                  Explore Financial Aid Options
                </button>
              </div>
            )}

            {activeTab === "campus" && (
              <div className="campus-tab">
                <h2>Campus Life</h2>
                <p>
                  Experience a vibrant and dynamic campus community at{" "}
                  {university.name}.
                </p>

                <div className="campus-gallery">
                  <img
                    src="https://via.placeholder.com/500x300?text=Campus+View+1"
                    alt="Campus"
                  />
                  <div className="gallery-thumbs">
                    <img
                      src="https://via.placeholder.com/100x100?text=1"
                      alt="Campus Thumbnail"
                    />
                    <img
                      src="https://via.placeholder.com/100x100?text=2"
                      alt="Campus Thumbnail"
                    />
                    <img
                      src="https://via.placeholder.com/100x100?text=3"
                      alt="Campus Thumbnail"
                    />
                    <img
                      src="https://via.placeholder.com/100x100?text=4"
                      alt="Campus Thumbnail"
                    />
                  </div>
                </div>

                <div className="campus-sections">
                  <div className="campus-section">
                    <h3>Housing & Dining</h3>
                    <p>
                      Our residential system is at the heart of the student
                      experience. First-year students live in freshman
                      dormitories, while upperclassmen live in undergraduate
                      houses or off-campus apartments.
                    </p>
                    <p>
                      Our dining halls offer a variety of nutritious and
                      delicious options to cater to all dietary preferences and
                      restrictions.
                    </p>
                  </div>

                  <div className="campus-section">
                    <h3>Student Organizations</h3>
                    <p>
                      With over 400 student organizations, there's something for
                      everyone at {university.name}. From academic clubs to
                      cultural organizations, performing arts groups to
                      community service initiatives, you'll find countless ways
                      to pursue your passions and make lifelong friends.
                    </p>
                  </div>

                  <div className="campus-section">
                    <h3>Athletics & Recreation</h3>
                    <p>
                      Our athletics program offers 42 varsity sports, as well as
                      numerous club and intramural options. Our state-of-the-art
                      recreational facilities include fitness centers, swimming
                      pools, tennis courts, and more.
                    </p>
                  </div>

                  <div className="campus-section">
                    <h3>Student Support Services</h3>
                    <p>
                      We offer comprehensive support services to help students
                      thrive academically, professionally, and personally. These
                      include academic advising, career services, health and
                      wellness resources, and support for students with
                      disabilities.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "events" && (
              <div className="events-tab">
                <h2>Upcoming Events</h2>
                <p>
                  Stay connected with the latest happenings at {university.name}
                  .
                </p>

                <div className="events-list">
                  {university.events.map((event) => (
                    <div className="event-item" key={event.id}>
                      <div className="event-date">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="event-details">
                        <h3>{event.name}</h3>
                        <p>Location: Main Campus</p>
                        <p>Time: 10:00 AM - 2:00 PM</p>
                      </div>
                      <button className="event-register-btn">Register</button>
                    </div>
                  ))}
                  <div className="event-item">
                    <div className="event-date">Oct 15</div>
                    <div className="event-details">
                      <h3>Open House Day</h3>
                      <p>Location: Main Campus</p>
                      <p>Time: 9:00 AM - 4:00 PM</p>
                    </div>
                    <button className="event-register-btn">Register</button>
                  </div>
                  <div className="event-item">
                    <div className="event-date">Nov 5</div>
                    <div className="event-details">
                      <h3>Research Symposium</h3>
                      <p>Location: Science Center</p>
                      <p>Time: 1:00 PM - 5:00 PM</p>
                    </div>
                    <button className="event-register-btn">Register</button>
                  </div>
                </div>

                <button className="view-all-events-btn">View All Events</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer /> {/* Added Footer component */}
    </div>
  );
};

// Sample university data for demo purposes
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
];

export default UniversityDetailPage;
