import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  // Sample user data (will be fetched in a real app)
  const user = {
    id: 1,
    name: "Alex Johnson",
    avatar: "/images/profile-avatar.jpg",
    coverPhoto: "/images/profile-cover.jpg",
    tagline: "Computer Science Student | AI Enthusiast",
    university: "Stanford University",
    location: "Palo Alto, CA",
    fields: ["Computer Science"],
    about:
      "I'm a third-year Computer Science student at Stanford, passionate about artificial intelligence and machine learning. Currently working on several research projects and looking for summer internship opportunities in the tech industry.",
    interests: [
      "Artificial Intelligence",
      "Machine Learning",
      "Web Development",
      "Robotics",
      "Algorithms",
      "Data Science",
      "Basketball",
    ],
    education: [
      {
        id: 1,
        institution: "Stanford University",
        degree: "Bachelor of Science in Computer Science",
        period: "2021 - Present",
        description:
          "Focusing on Artificial Intelligence and Machine Learning. Current GPA: 3.8/4.0",
      },
      {
        id: 2,
        institution: "Tech High School",
        degree: "High School Diploma",
        period: "2017 - 2021",
        description:
          "Graduated with honors. Participated in Robotics Club and Mathematics Olympiad.",
      },
    ],
    courses: [
      {
        id: 1,
        code: "CS50",
        title: "Introduction to Computer Science",
        institution: "Harvard University (Online)",
        period: "Summer 2020",
        certificate: true,
      },
      {
        id: 2,
        code: "CS229",
        title: "Machine Learning",
        institution: "Stanford University",
        period: "Fall 2022",
        grade: "A",
      },
      {
        id: 3,
        code: "CS224N",
        title: "Natural Language Processing with Deep Learning",
        institution: "Stanford University",
        period: "Winter 2023",
        grade: "A-",
      },
    ],
    achievements: [
      {
        id: 1,
        title: "Dean's List",
        organization: "Stanford University",
        date: "2021-2023",
        description:
          "Recognized for academic excellence for 4 consecutive semesters.",
      },
      {
        id: 2,
        title: "2nd Place",
        organization: "Stanford AI Hackathon",
        date: "March 2023",
        description:
          "Developed an AI-powered tool for detecting early signs of crop diseases from drone imagery.",
      },
      {
        id: 3,
        title: "Research Grant",
        organization: "National Science Foundation",
        date: "June 2023",
        description:
          "Awarded $10,000 for research on applying reinforcement learning to robotic navigation.",
      },
    ],
    projects: [
      {
        id: 1,
        title: "AI Chatbot for Mental Health Support",
        description:
          "A conversational AI system designed to provide initial support for people experiencing anxiety or stress.",
        tags: ["Python", "TensorFlow", "NLP", "Healthcare"],
        date: "January 2023",
        image: "/images/project1.jpg",
      },
      {
        id: 2,
        title: "Smart Campus Navigation App",
        description:
          "Mobile app that helps students navigate campus efficiently and locate available study spaces.",
        tags: ["React Native", "Node.js", "Machine Learning"],
        date: "October 2022",
        image: "/images/project2.jpg",
      },
      {
        id: 3,
        title: "Distributed File System",
        description:
          "Implemented a distributed file system with fault tolerance and load balancing capabilities.",
        tags: ["Go", "Distributed Systems", "Networking"],
        date: "May 2022",
        image: "/images/project3.jpg",
      },
    ],
    clubs: [
      {
        id: 1,
        name: "Stanford AI Group",
        role: "Technical Lead",
        period: "2022 - Present",
        description:
          "Leading a team of 5 students working on computer vision projects for social good.",
      },
      {
        id: 2,
        name: "ACM Student Chapter",
        role: "Member",
        period: "2021 - Present",
        description:
          "Participating in competitive programming contests and tech talks.",
      },
    ],
    events: [
      {
        id: 1,
        title: "Stanford AI Conference",
        date: "2023-11-15",
        month: "Nov",
        day: "15",
        location: "Stanford Campus, Building 300",
        description:
          "Annual AI conference featuring speakers from industry and academia.",
      },
      {
        id: 2,
        title: "Tech Career Fair",
        date: "2023-10-05",
        month: "Oct",
        day: "5",
        location: "Engineering Quad",
        description:
          "Networking event with tech companies for internship and job opportunities.",
      },
    ],
    friends: [
      {
        id: 1,
        name: "Emily Chen",
        username: "@emilychen",
        avatar: "/images/emily.jpg",
        mutualFriends: 12,
      },
      {
        id: 2,
        name: "Michael Rodriguez",
        username: "@mrodriguez",
        avatar: "/images/michael.jpg",
        mutualFriends: 8,
      },
      {
        id: 3,
        name: "Sarah Kim",
        username: "@sarahkim",
        avatar: "/images/sarah.jpg",
        mutualFriends: 15,
      },
      {
        id: 4,
        name: "David Park",
        username: "@davidpark",
        avatar: "/images/david.jpg",
        mutualFriends: 6,
      },
    ],
    friendRequests: [
      // New sample data for friend requests
      {
        id: 5,
        name: "Lisa Nguyen",
        username: "@lisanguyen",
        avatar: "/images/lisa.jpg",
        mutualFriends: 3,
      },
      {
        id: 6,
        name: "James Carter",
        username: "@jamescarter",
        avatar: "/images/james.jpg",
        mutualFriends: 5,
      },
    ],
  };

  const handleEditProfile = () => {
    navigate("/account");
  };

  const handleAddFriend = (friendId) => {
    console.log(`Accepted friend request from ID: ${friendId}`);
    // In a real app, this would update the friends list and remove from friendRequests via API
  };

  const handleRejectFriend = (friendId) => {
    console.log(`Rejected friend request from ID: ${friendId}`);
    // In a real app, this would remove the friend request via API
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div
            className="profile-cover"
            style={{
              backgroundImage: `url(${
                user.coverPhoto || "/images/default-cover.jpg"
              })`,
            }}
          ></div>
          <div className="profile-user-info">
            <div className="profile-avatar">
              <span>
                {user.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </span>
            </div>
            <div className="profile-details">
              <h1>{user.name}</h1>
              <p className="profile-tagline">{user.tagline}</p>
              <div className="profile-meta">
                <div className="profile-meta-item">
                  <i className="fas fa-university"></i>
                  <span>{user.university}</span>
                </div>
                {user.fields.length > 0 && (
                  <div className="profile-meta-item">
                    <i className="fas fa-graduation-cap"></i>
                    <span>{user.fields.join(", ")}</span>
                  </div>
                )}
                {user.location && (
                  <div className="profile-meta-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{user.location}</span>
                  </div>
                )}
              </div>
              <div className="profile-actions">
                <button
                  className="edit-profile-btn"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
                <button className="add-friend-btn">Add Friend</button>
                <button className="message-btn">Message</button>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-tabs">
          <button
            className={`profile-tab ${
              activeTab === "overview" ? "active" : ""
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`profile-tab ${
              activeTab === "education" ? "active" : ""
            }`}
            onClick={() => setActiveTab("education")}
          >
            Education
          </button>
          <button
            className={`profile-tab ${
              activeTab === "achievements" ? "active" : ""
            }`}
            onClick={() => setActiveTab("achievements")}
          >
            Achievements
          </button>
          <button
            className={`profile-tab ${
              activeTab === "activities" ? "active" : ""
            }`}
            onClick={() => setActiveTab("activities")}
          >
            Activities
          </button>
          <button
            className={`profile-tab ${activeTab === "friends" ? "active" : ""}`}
            onClick={() => setActiveTab("friends")}
          >
            Friends
          </button>
          <button
            className={`profile-tab ${
              activeTab === "friendRequests" ? "active" : ""
            }`}
            onClick={() => setActiveTab("friendRequests")}
          >
            Friend Requests
          </button>
        </div>

        <div className="profile-content">
          {activeTab === "overview" && (
            <div className="profile-overview">
              <section className="profile-section">
                <h2 className="section-title">About</h2>
                <p className="about-text">{user.about}</p>
              </section>
              <section className="profile-section">
                <h2 className="section-title">Interests</h2>
                <div className="interests-list">
                  {user.interests.map((interest, index) => (
                    <span key={index} className="interest-tag">
                      {interest}
                    </span>
                  ))}
                </div>
              </section>
              <section className="profile-section">
                <h2 className="section-title">Projects</h2>
                <div className="projects-grid">
                  {user.projects.map((project) => (
                    <div key={project.id} className="project-card">
                      <div className="project-image">
                        <img
                          src={project.image || "/images/default-project.jpg"}
                          alt={project.title}
                        />
                      </div>
                      <div className="project-info">
                        <h3>
                          <Link to={`/projects/${project.id}`}>
                            {project.title}
                          </Link>
                        </h3>
                        <p className="project-date">{project.date}</p>
                        <p className="project-description">
                          {project.description}
                        </p>
                        <div className="project-tags">
                          {project.tags.map((tag, index) => (
                            <span key={index} className="project-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "education" && (
            <div className="profile-education">
              <section className="profile-section">
                <h2 className="section-title">Education</h2>
                <div className="education-list">
                  {user.education.map((item) => (
                    <div key={item.id} className="education-item">
                      <div className="education-icon">
                        <i className="fas fa-university"></i>
                      </div>
                      <div className="education-content">
                        <h3>{item.institution}</h3>
                        <p className="education-degree">{item.degree}</p>
                        <p className="education-period">{item.period}</p>
                        <p className="education-description">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="profile-section">
                <h2 className="section-title">Courses</h2>
                <div className="courses-list">
                  {user.courses.map((course) => (
                    <div key={course.id} className="course-item">
                      <div className="course-icon">
                        <i className="fas fa-book"></i>
                      </div>
                      <div className="course-content">
                        <h3>{course.title}</h3>
                        <p className="course-code">{course.code}</p>
                        <p className="course-institution">
                          {course.institution}
                        </p>
                        <p className="course-period">{course.period}</p>
                        {course.grade && (
                          <p className="course-grade">Grade: {course.grade}</p>
                        )}
                        {course.certificate && (
                          <div className="course-certificate">
                            <i className="fas fa-certificate"></i> Certificate
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="profile-achievements">
              <section className="profile-section">
                <h2 className="section-title">Achievements</h2>
                <div className="achievements-list">
                  {user.achievements.map((achievement) => (
                    <div key={achievement.id} className="achievement-item">
                      <div className="achievement-icon">
                        <i className="fas fa-trophy"></i>
                      </div>
                      <div className="achievement-content">
                        <h3>{achievement.title}</h3>
                        <p className="achievement-organization">
                          {achievement.organization}
                        </p>
                        <p className="achievement-date">{achievement.date}</p>
                        <p className="achievement-description">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "activities" && (
            <div className="profile-activities">
              <section className="profile-section">
                <h2 className="section-title">Clubs & Organizations</h2>
                <div className="clubs-list">
                  {user.clubs.map((club) => (
                    <div key={club.id} className="club-item">
                      <div className="club-icon">
                        <i className="fas fa-users"></i>
                      </div>
                      <div className="club-content">
                        <h3>{club.name}</h3>
                        <p className="club-role">{club.role}</p>
                        <p className="club-period">{club.period}</p>
                        <p className="club-description">{club.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="profile-section">
                <h2 className="section-title">Upcoming Events</h2>
                <div className="events-list">
                  {user.events.map((event) => (
                    <div key={event.id} className="event-item">
                      <div className="event-date">
                        <span className="event-month">{event.month}</span>
                        <span className="event-day">{event.day}</span>
                      </div>
                      <div className="event-content">
                        <h3>{event.title}</h3>
                        <p className="event-location">
                          <i className="fas fa-map-marker-alt"></i>{" "}
                          {event.location}
                        </p>
                        <p className="event-description">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "friends" && (
            <div className="profile-friends">
              <section className="profile-section">
                <h2 className="section-title">
                  Friends <span>({user.friends.length})</span>
                </h2>
                <div className="friends-list">
                  {user.friends.map((friend) => (
                    <div key={friend.id} className="friend-card">
                      <div className="friend-avatar">
                        <img
                          src={friend.avatar || "/images/default-avatar.jpg"}
                          alt={friend.name}
                        />
                      </div>
                      <div className="friend-info">
                        <h3>{friend.name}</h3>
                        <p className="friend-username">{friend.username}</p>
                        <p className="mutual-friends">
                          <i className="fas fa-users"></i>{" "}
                          {friend.mutualFriends} mutual friends
                        </p>
                        <div className="friend-actions">
                          <button className="message-friend-btn">
                            Message
                          </button>
                          <button className="view-profile-btn">
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "friendRequests" && (
            <div className="profile-friend-requests">
              <section className="profile-section">
                <h2 className="section-title">
                  Friend Requests <span>({user.friendRequests.length})</span>
                </h2>
                <div className="friend-requests-list">
                  {user.friendRequests.length > 0 ? (
                    user.friendRequests.map((request) => (
                      <div key={request.id} className="friend-request-card">
                        <div className="friend-avatar">
                          <img
                            src={request.avatar || "/images/default-avatar.jpg"}
                            alt={request.name}
                          />
                        </div>
                        <div className="friend-info">
                          <h3>{request.name}</h3>
                          <p className="friend-username">{request.username}</p>
                          <p className="mutual-friends">
                            <i className="fas fa-users"></i>{" "}
                            {request.mutualFriends} mutual friends
                          </p>
                          <div className="friend-request-actions">
                            <button
                              className="add-friend-request-btn"
                              onClick={() => handleAddFriend(request.id)}
                            >
                              <i className="fas fa-check"></i> Add Friend
                            </button>
                            <button
                              className="reject-friend-request-btn"
                              onClick={() => handleRejectFriend(request.id)}
                            >
                              <i className="fas fa-times"></i> Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-requests">No new friend requests.</p>
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
