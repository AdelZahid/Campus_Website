
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './ProfilePage.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  
  useEffect(() => {
    // Simulate loading profile data
    setTimeout(() => {
      setProfileData(sampleProfile);
      setIsLoading(false);
    }, 800);
  }, []);
  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Here you would typically save the updated profile data to an API
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />
      
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-cover" style={{ backgroundImage: `url(${profileData.coverPhoto})` }}>
            <div className="profile-avatar">
              <img src={profileData.avatar} alt={profileData.name} />
            </div>
          </div>
          
          <div className="profile-info">
            <div className="profile-meta">
              <h1>{profileData.name}</h1>
              <p className="profile-headline">{profileData.headline}</p>
              <div className="profile-details">
                <div className="detail-item">
                  <i className="fas fa-university"></i> {profileData.university}
                </div>
                <div className="detail-item">
                  <i className="fas fa-graduation-cap"></i> {profileData.major}
                </div>
                <div className="detail-item">
                  <i className="fas fa-map-marker-alt"></i> {profileData.location}
                </div>
              </div>
            </div>
            
            <div className="profile-actions">
              <button className="edit-profile-btn" onClick={handleEditToggle}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
              {!isEditing && (
                <>
                  <button className="add-friend-btn">
                    <i className="fas fa-user-plus"></i> Add Friend
                  </button>
                  <button className="message-btn">
                    <i className="fas fa-comment"></i> Message
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="profile-navigation">
          <button 
            className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`nav-tab ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            Education
          </button>
          <button 
            className={`nav-tab ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            Achievements
          </button>
          <button 
            className={`nav-tab ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            Activities
          </button>
          <button 
            className={`nav-tab ${activeTab === 'friends' ? 'active' : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            Friends
          </button>
        </div>
        
        <div className="profile-content">
          {isEditing ? (
            <div className="profile-edit-form">
              <h2>Edit Profile</h2>
              <form onSubmit={handleSaveProfile}>
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    defaultValue={profileData.name} 
                    placeholder="Your name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Headline</label>
                  <input 
                    type="text" 
                    defaultValue={profileData.headline} 
                    placeholder="Your headline"
                  />
                </div>
                
                <div className="form-group">
                  <label>University</label>
                  <input 
                    type="text" 
                    defaultValue={profileData.university} 
                    placeholder="Your university"
                  />
                </div>
                
                <div className="form-group">
                  <label>Major</label>
                  <input 
                    type="text" 
                    defaultValue={profileData.major} 
                    placeholder="Your major"
                  />
                </div>
                
                <div className="form-group">
                  <label>Location</label>
                  <input 
                    type="text" 
                    defaultValue={profileData.location} 
                    placeholder="Your location"
                  />
                </div>
                
                <div className="form-group">
                  <label>Bio</label>
                  <textarea 
                    defaultValue={profileData.bio} 
                    placeholder="Tell something about yourself"
                    rows="4"
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label>Interests</label>
                  <input 
                    type="text" 
                    defaultValue={profileData.interests.join(', ')} 
                    placeholder="Your interests (comma separated)"
                  />
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="save-btn">Save Changes</button>
                  <button type="button" className="cancel-btn" onClick={handleEditToggle}>Cancel</button>
                </div>
              </form>
            </div>
          ) : (
            <div className="profile-tabs-content">
              {activeTab === 'overview' && (
                <div className="profile-overview">
                  <div className="profile-section">
                    <h2>About</h2>
                    <p>{profileData.bio}</p>
                  </div>
                  
                  <div className="profile-section">
                    <h2>Interests</h2>
                    <div className="interests-list">
                      {profileData.interests.map((interest, index) => (
                        <span key={index} className="interest-tag">{interest}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="profile-section">
                    <h2>Recent Activity</h2>
                    <div className="activity-list">
                      {profileData.recentActivity.map((activity, index) => (
                        <div key={index} className="activity-item">
                          <div className="activity-icon">
                            <i className={`fas fa-${activity.icon}`}></i>
                          </div>
                          <div className="activity-content">
                            <p>{activity.text}</p>
                            <span className="activity-time">{activity.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'education' && (
                <div className="profile-education">
                  <h2>Education</h2>
                  <div className="education-list">
                    {profileData.education.map((edu, index) => (
                      <div key={index} className="education-item">
                        <div className="education-icon">
                          <i className="fas fa-university"></i>
                        </div>
                        <div className="education-content">
                          <h3>{edu.institution}</h3>
                          <p className="education-degree">{edu.degree}</p>
                          <p className="education-date">{edu.startYear} - {edu.endYear || 'Present'}</p>
                          <p className="education-description">{edu.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h2>Courses</h2>
                  <div className="courses-list">
                    {profileData.courses.map((course, index) => (
                      <div key={index} className="course-item">
                        <div className="course-icon">
                          <i className="fas fa-book"></i>
                        </div>
                        <div className="course-content">
                          <h3>{course.name}</h3>
                          <p className="course-code">{course.code}</p>
                          <p className="course-instructor">Instructor: {course.instructor}</p>
                          <p className="course-semester">{course.semester}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'achievements' && (
                <div className="profile-achievements">
                  <h2>Achievements</h2>
                  <div className="achievements-list">
                    {profileData.achievements.map((achievement, index) => (
                      <div key={index} className="achievement-item">
                        <div className="achievement-icon">
                          <i className={`fas fa-${achievement.icon}`}></i>
                        </div>
                        <div className="achievement-content">
                          <h3>{achievement.title}</h3>
                          <p className="achievement-date">{achievement.date}</p>
                          <p className="achievement-description">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'activities' && (
                <div className="profile-activities">
                  <h2>Clubs & Organizations</h2>
                  <div className="clubs-list">
                    {profileData.clubs.map((club, index) => (
                      <div key={index} className="club-item">
                        <div className="club-icon">
                          <i className={`fas fa-${club.icon}`}></i>
                        </div>
                        <div className="club-content">
                          <h3>{club.name}</h3>
                          <p className="club-role">{club.role}</p>
                          <p className="club-duration">{club.startYear} - {club.endYear || 'Present'}</p>
                          <p className="club-description">{club.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h2>Events Attended</h2>
                  <div className="events-list">
                    {profileData.eventsAttended.map((event, index) => (
                      <div key={index} className="event-item">
                        <div className="event-date">
                          <span className="event-month">{event.month}</span>
                          <span className="event-day">{event.day}</span>
                        </div>
                        <div className="event-content">
                          <h3>{event.name}</h3>
                          <p className="event-location">
                            <i className="fas fa-map-marker-alt"></i> {event.location}
                          </p>
                          <p className="event-description">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'friends' && (
                <div className="profile-friends">
                  <h2>Friends <span>({profileData.friends.length})</span></h2>
                  <div className="friends-list">
                    {profileData.friends.map((friend, index) => (
                      <div key={index} className="friend-card">
                        <div className="friend-avatar">
                          <img src={friend.avatar} alt={friend.name} />
                        </div>
                        <h3>{friend.name}</h3>
                        <p className="friend-headline">{friend.headline}</p>
                        <p className="friend-university">
                          <i className="fas fa-university"></i> {friend.university}
                        </p>
                        <div className="friend-actions">
                          <button className="message-friend">
                            <i className="fas fa-comment"></i> Message
                          </button>
                          <button className="view-profile">
                            <i className="fas fa-user"></i> Profile
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Sample data
const sampleProfile = {
  name: "Alex Johnson",
  headline: "Computer Science Student | AI Enthusiast",
  university: "Stanford University",
  major: "Computer Science",
  location: "Palo Alto, CA",
  avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=0D8ABC&color=fff&size=200",
  coverPhoto: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
  bio: "I'm a third-year Computer Science student at Stanford, passionate about artificial intelligence and machine learning. Currently working on several research projects and looking for summer internship opportunities in the tech industry.",
  interests: ["Artificial Intelligence", "Machine Learning", "Web Development", "Robotics", "Algorithms", "Data Science", "Basketball", "Photography"],
  recentActivity: [
    {
      icon: "comment",
      text: "Replied to a question in Algorithms course discussion",
      time: "2 hours ago"
    },
    {
      icon: "star",
      text: "Added 'Introduction to AI Ethics' to favorite courses",
      time: "Yesterday"
    },
    {
      icon: "users",
      text: "Joined the Stanford Robotics Club",
      time: "3 days ago"
    },
    {
      icon: "calendar-check",
      text: "Registered for the AI Research Symposium",
      time: "1 week ago"
    }
  ],
  education: [
    {
      institution: "Stanford University",
      degree: "Bachelor of Science in Computer Science",
      startYear: 2020,
      endYear: 2024,
      description: "Focusing on Artificial Intelligence and Machine Learning. Current GPA: 3.85/4.0"
    },
    {
      institution: "Westlake High School",
      degree: "High School Diploma",
      startYear: 2016,
      endYear: 2020,
      description: "Graduated with honors. President of Computer Science Club."
    }
  ],
  courses: [
    {
      name: "Machine Learning",
      code: "CS 229",
      instructor: "Dr. Andrew Smith",
      semester: "Fall 2022"
    },
    {
      name: "Artificial Intelligence",
      code: "CS 221",
      instructor: "Dr. Jennifer Lee",
      semester: "Spring 2022"
    },
    {
      name: "Data Structures and Algorithms",
      code: "CS 161",
      instructor: "Dr. Michael Chen",
      semester: "Fall 2021"
    },
    {
      name: "Web Applications",
      code: "CS 142",
      instructor: "Dr. Sarah Johnson",
      semester: "Spring 2021"
    }
  ],
  achievements: [
    {
      title: "Dean's List",
      date: "2022",
      description: "Recognized for academic excellence for maintaining a GPA above 3.7",
      icon: "award"
    },
    {
      title: "Hackathon Winner",
      date: "October 2021",
      description: "First place in Stanford's annual hackathon for developing an AI-powered educational app",
      icon: "trophy"
    },
    {
      title: "Research Grant",
      date: "2021",
      description: "Received $5,000 grant for research on neural networks and their applications in computer vision",
      icon: "flask"
    }
  ],
  clubs: [
    {
      name: "Stanford Robotics Club",
      role: "Member",
      startYear: 2022,
      endYear: null,
      description: "Participating in robotics competitions and research projects",
      icon: "robot"
    },
    {
      name: "AI Research Group",
      role: "Research Assistant",
      startYear: 2021,
      endYear: null,
      description: "Assisting with research on deep learning algorithms and their applications",
      icon: "brain"
    },
    {
      name: "Coding for Good",
      role: "Project Lead",
      startYear: 2020,
      endYear: 2022,
      description: "Led a team developing web applications for local nonprofits",
      icon: "heart"
    }
  ],
  eventsAttended: [
    {
      name: "AI Research Symposium",
      month: "Mar",
      day: "15",
      location: "Stanford University",
      description: "Annual symposium featuring presentations on the latest AI research and applications"
    },
    {
      name: "Tech Career Fair",
      month: "Feb",
      day: "28",
      location: "Stanford Memorial Hall",
      description: "Networked with representatives from top tech companies and explored internship opportunities"
    },
    {
      name: "Web Dev Workshop",
      month: "Jan",
      day: "12",
      location: "Computer Science Building",
      description: "Hands-on workshop on modern web development frameworks and technologies"
    }
  ],
  friends: [
    {
      name: "Emily Chen",
      headline: "Computer Science | AI Researcher",
      university: "Stanford University",
      avatar: "https://ui-avatars.com/api/?name=Emily+Chen&background=e74c3c&color=fff"
    },
    {
      name: "David Kim",
      headline: "Electrical Engineering Student",
      university: "Stanford University",
      avatar: "https://ui-avatars.com/api/?name=David+Kim&background=27ae60&color=fff"
    },
    {
      name: "Sarah Williams",
      headline: "Data Science Major",
      university: "UC Berkeley",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Williams&background=8e44ad&color=fff"
    },
    {
      name: "Michael Brown",
      headline: "Software Engineering Intern at Google",
      university: "Stanford University",
      avatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=f39c12&color=fff"
    },
    {
      name: "Jessica Martinez",
      headline: "Computer Science | Machine Learning",
      university: "MIT",
      avatar: "https://ui-avatars.com/api/?name=Jessica+Martinez&background=3498db&color=fff"
    },
    {
      name: "Ryan Taylor",
      headline: "Robotics Enthusiast",
      university: "Stanford University",
      avatar: "https://ui-avatars.com/api/?name=Ryan+Taylor&background=1abc9c&color=fff"
    }
  ]
};

export default ProfilePage;
