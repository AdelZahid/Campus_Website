
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './ProgramsPage.css';

const ProgramsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    level: 'all',
    field: 'all',
    duration: 'all'
  });

  // Sample programs data
  const programs = [
    {
      id: 1,
      name: "Computer Science",
      level: "Undergraduate",
      field: "Engineering & Technology",
      duration: "4 years",
      university: "MIT",
      description: "A comprehensive program covering algorithms, software development, artificial intelligence, and more.",
      credits: 120,
      tuition: "$52,000/year",
      career: ["Software Engineer", "Data Scientist", "System Analyst"]
    },
    {
      id: 2,
      name: "Business Administration",
      level: "Graduate",
      field: "Business",
      duration: "2 years",
      university: "Harvard University",
      description: "Develop leadership skills and business acumen through case studies and practical experience.",
      credits: 60,
      tuition: "$65,000/year",
      career: ["Business Analyst", "Marketing Manager", "Entrepreneur"]
    },
    {
      id: 3,
      name: "Environmental Science",
      level: "Undergraduate",
      field: "Natural Sciences",
      duration: "3 years",
      university: "Stanford University",
      description: "Study ecosystems, climate change, and sustainable development practices.",
      credits: 90,
      tuition: "$49,000/year",
      career: ["Environmental Consultant", "Conservation Scientist", "Sustainability Coordinator"]
    },
    {
      id: 4,
      name: "Data Science",
      level: "Graduate",
      field: "Engineering & Technology",
      duration: "1.5 years",
      university: "UC Berkeley",
      description: "Learn to extract insights from complex data using statistics, programming, and machine learning.",
      credits: 45,
      tuition: "$55,000/year",
      career: ["Data Scientist", "Machine Learning Engineer", "Business Intelligence Analyst"]
    },
    {
      id: 5,
      name: "Psychology",
      level: "Undergraduate",
      field: "Social Sciences",
      duration: "4 years",
      university: "Princeton University",
      description: "Explore human behavior, cognition, and mental processes through research and theory.",
      credits: 120,
      tuition: "$50,000/year",
      career: ["Counselor", "Research Assistant", "Human Resources Specialist"]
    },
    {
      id: 6,
      name: "Artificial Intelligence",
      level: "Graduate",
      field: "Engineering & Technology",
      duration: "2 years",
      university: "Carnegie Mellon University",
      description: "Advanced study of machine learning, robotics, and cognitive systems.",
      credits: 60,
      tuition: "$58,000/year",
      career: ["AI Engineer", "Research Scientist", "Robotics Engineer"]
    }
  ];

  // Filter functions
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         program.university.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = filters.level === 'all' || program.level === filters.level;
    const matchesField = filters.field === 'all' || program.field === filters.field;
    const matchesDuration = filters.duration === 'all' || program.duration === filters.duration;
    
    return matchesSearch && matchesLevel && matchesField && matchesDuration;
  });

  // Get unique values for filters
  const levels = [...new Set(programs.map(p => p.level))];
  const fields = [...new Set(programs.map(p => p.field))];
  const durations = [...new Set(programs.map(p => p.duration))];

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="programs-page">
      <Navbar />
      
      <div className="programs-hero">
        <div className="hero-content">
          <h1>Discover Academic Programs</h1>
          <p>Find the perfect program to match your interests and career goals</p>
          
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search programs or universities..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button><i className="fas fa-search"></i></button>
          </div>
        </div>
      </div>
      
      <div className="programs-container">
        <div className="filters-container">
          <div className="filter">
            <label>Level:</label>
            <select name="level" value={filters.level} onChange={handleFilterChange}>
              <option value="all">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          
          <div className="filter">
            <label>Field:</label>
            <select name="field" value={filters.field} onChange={handleFilterChange}>
              <option value="all">All Fields</option>
              {fields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>
          
          <div className="filter">
            <label>Duration:</label>
            <select name="duration" value={filters.duration} onChange={handleFilterChange}>
              <option value="all">All Durations</option>
              {durations.map(duration => (
                <option key={duration} value={duration}>{duration}</option>
              ))}
            </select>
          </div>
        </div>
        
        <h2 className="section-title">Available Programs ({filteredPrograms.length})</h2>
        
        <div className="programs-grid">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map(program => (
              <div className="program-card" key={program.id}>
                <span className="program-level">{program.level}</span>
                <h3 className="program-name">{program.name}</h3>
                <p className="program-university">{program.university}</p>
                <p className="program-duration"><i className="far fa-clock"></i> {program.duration}</p>
                <p className="program-description">{program.description}</p>
                
                <div className="program-details">
                  <div className="detail">
                    <span className="detail-label">Credits:</span>
                    <span className="detail-value">{program.credits}</span>
                  </div>
                  <div className="detail">
                    <span className="detail-label">Tuition:</span>
                    <span className="detail-value">{program.tuition}</span>
                  </div>
                </div>
                
                <h4 className="career-title">Career Paths:</h4>
                <ul className="career-list">
                  {program.career.map((career, index) => (
                    <li key={index}>{career}</li>
                  ))}
                </ul>
                
                <div className="program-actions">
                  <button className="view-button">View Details</button>
                  <button className="apply-button">Apply Now</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>No programs match your criteria</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;
