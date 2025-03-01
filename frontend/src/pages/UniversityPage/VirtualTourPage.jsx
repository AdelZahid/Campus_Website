
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './VirtualTourPage.css';

const VirtualTourPage = () => {
  const [activeLocation, setActiveLocation] = useState(1);
  
  // Sample campus locations data
  const campusLocations = [
    {
      id: 1,
      name: "Main Campus Quad",
      image: "https://via.placeholder.com/1200x600?text=Campus+Quad",
      description: "The heart of our campus, where students gather for events, study sessions, and relaxation between classes. Surrounded by historic buildings and beautiful landscaping.",
      features: ["Central gathering space", "Historic fountain", "Outdoor study areas", "Wi-Fi enabled"]
    },
    {
      id: 2,
      name: "Science and Technology Center",
      image: "https://via.placeholder.com/1200x600?text=Science+Center",
      description: "Our state-of-the-art facility houses laboratories, research spaces, and lecture halls for the sciences, engineering, and technology programs.",
      features: ["Research laboratories", "Advanced technology classrooms", "Innovation hub", "Student project spaces"]
    },
    {
      id: 3,
      name: "University Library",
      image: "https://via.placeholder.com/1200x600?text=University+Library",
      description: "Our award-winning library contains over 2 million volumes, digital resources, and specialized collections. Open 24/7 during academic terms.",
      features: ["Study rooms", "Digital media lab", "Rare book collection", "Cafe and lounge areas"]
    },
    {
      id: 4,
      name: "Student Center",
      image: "https://via.placeholder.com/1200x600?text=Student+Center",
      description: "The hub of student life, featuring dining options, student organization offices, recreation areas, and event spaces for campus activities.",
      features: ["Food court", "Student organization offices", "Recreation center", "Event auditorium"]
    },
    {
      id: 5,
      name: "Athletic Complex",
      image: "https://via.placeholder.com/1200x600?text=Athletic+Complex",
      description: "Home to our varsity sports teams and recreational facilities, including an Olympic-sized swimming pool, fitness center, and multi-purpose courts.",
      features: ["Gymnasium", "Swimming pool", "Fitness center", "Outdoor fields"]
    },
    {
      id: 6,
      name: "Residential Halls",
      image: "https://via.placeholder.com/1200x600?text=Residential+Halls",
      description: "Our modern residence halls provide comfortable living spaces with a variety of room configurations, common areas, and amenities for students.",
      features: ["Single and double rooms", "Study lounges", "Community kitchens", "Laundry facilities"]
    }
  ];
  
  const currentLocation = campusLocations.find(location => location.id === activeLocation);

  return (
    <div className="virtual-tour-page">
      <Navbar />
      
      <div className="tour-hero">
        <div className="hero-content">
          <h1>Virtual Campus Tour</h1>
          <p>Explore our beautiful campus from anywhere in the world</p>
          <button className="schedule-tour-button">Schedule In-Person Tour</button>
        </div>
      </div>
      
      <div className="tour-container">
        <div className="tour-description">
          <h2>Experience Our Campus</h2>
          <p>Welcome to our virtual campus tour! Explore key locations around our university to get a sense of student life, academic facilities, and the beautiful environment that makes our campus special. Use the navigation below to visit different areas.</p>
        </div>
        
        <div className="location-navigation">
          {campusLocations.map(location => (
            <button 
              key={location.id}
              className={activeLocation === location.id ? 'active' : ''}
              onClick={() => setActiveLocation(location.id)}
            >
              {location.name}
            </button>
          ))}
        </div>
        
        <div className="tour-viewer">
          {currentLocation && (
            <>
              <div className="tour-image-container">
                <img src={currentLocation.image} alt={currentLocation.name} className="tour-image" />
                <h3 className="location-title">{currentLocation.name}</h3>
              </div>
              
              <div className="location-details">
                <p className="location-description">{currentLocation.description}</p>
                
                <div className="location-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {currentLocation.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="tour-actions">
                  <button className="view-360-button">View 360° Panorama</button>
                  <button className="view-gallery-button">Photo Gallery</button>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="tour-map">
          <h3>Campus Map</h3>
          <div className="map-container">
            <img src="https://via.placeholder.com/1200x600?text=Campus+Map" alt="Campus Map" />
            {campusLocations.map(location => (
              <div 
                key={location.id}
                className={`map-marker ${activeLocation === location.id ? 'active' : ''}`}
                style={{ 
                  top: `${15 + (location.id * 10)}%`, 
                  left: `${10 + (location.id * 15)}%` 
                }}
                onClick={() => setActiveLocation(location.id)}
              >
                <span className="marker-number">{location.id}</span>
                <span className="marker-tooltip">{location.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="tour-info-section">
          <div className="tour-info-container">
            <div className="tour-info-card">
              <i className="fas fa-calendar-alt"></i>
              <h4>In-Person Tours</h4>
              <p>Join our student guides for an in-depth tour of our campus. Tours are offered Monday through Friday at 10:00 AM and 2:00 PM, and select Saturdays at 11:00 AM.</p>
              <button>Schedule a Tour</button>
            </div>
            
            <div className="tour-info-card">
              <i className="fas fa-info-circle"></i>
              <h4>Information Sessions</h4>
              <p>Learn about our academic programs, admissions process, and student life from our admissions counselors. Sessions are held daily at 9:00 AM and 1:00 PM.</p>
              <button>Register for a Session</button>
            </div>
            
            <div className="tour-info-card">
              <i className="fas fa-home"></i>
              <h4>Overnight Visits</h4>
              <p>Experience campus life firsthand by staying overnight in one of our residence halls with a current student host. Available for admitted students during the academic year.</p>
              <button>Request Overnight Visit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTourPage;
