
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './FacultyPage.css';

const FacultyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample faculty data
  const facultyMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Professor",
      department: "Computer Science",
      image: "https://via.placeholder.com/150?text=Dr.+Johnson",
      specializations: ["Artificial Intelligence", "Machine Learning", "Computer Vision"],
      bio: "Dr. Johnson has been at the forefront of AI research for over 15 years. She leads the university's Machine Learning Laboratory and has published numerous papers in top conferences.",
      email: "sjohnson@university.edu",
      office: "Tech Building, Room 305",
      education: [
        "Ph.D. in Computer Science, Stanford University",
        "M.S. in Computer Science, MIT",
        "B.S. in Mathematics, Princeton University"
      ],
      publications: [
        "Neural Networks for Computer Vision Applications (2022)",
        "Advances in Reinforcement Learning (2020)",
        "Ethical Considerations in AI Development (2019)"
      ]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      title: "Associate Professor",
      department: "Electrical Engineering",
      image: "https://via.placeholder.com/150?text=Dr.+Chen",
      specializations: ["Quantum Computing", "Signal Processing", "Embedded Systems"],
      bio: "Dr. Chen specializes in quantum computing applications. His research group focuses on developing practical quantum algorithms for optimization problems.",
      email: "mchen@university.edu",
      office: "Engineering Hall, Room 210",
      education: [
        "Ph.D. in Electrical Engineering, Caltech",
        "M.S. in Physics, University of Chicago",
        "B.S. in Electrical Engineering, UC Berkeley"
      ],
      publications: [
        "Quantum Algorithms for Linear Systems (2021)",
        "Error Correction in Quantum Circuits (2019)",
        "Signal Processing Applications in Quantum Computing (2018)"
      ]
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      title: "Assistant Professor",
      department: "Business",
      image: "https://via.placeholder.com/150?text=Dr.+Rodriguez",
      specializations: ["Marketing Analytics", "Consumer Behavior", "Digital Strategy"],
      bio: "Dr. Rodriguez combines business theory with data science to uncover insights into consumer behavior. She previously worked as a marketing consultant for Fortune 500 companies.",
      email: "erodriguez@university.edu",
      office: "Business Building, Room 415",
      education: [
        "Ph.D. in Business Administration, Harvard Business School",
        "MBA, Wharton School of Business",
        "B.A. in Economics, Columbia University"
      ],
      publications: [
        "Digital Marketing Strategies in the Post-Pandemic Era (2022)",
        "Consumer Behavior in E-commerce Platforms (2020)",
        "Predictive Analytics for Marketing Campaign Optimization (2018)"
      ]
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      title: "Professor",
      department: "Physics",
      image: "https://via.placeholder.com/150?text=Dr.+Wilson",
      specializations: ["Astrophysics", "Cosmology", "Particle Physics"],
      bio: "Dr. Wilson is a theoretical physicist whose work focuses on understanding the fundamental forces of the universe. He has contributed to several major discoveries in particle physics.",
      email: "jwilson@university.edu",
      office: "Science Center, Room 201",
      education: [
        "Ph.D. in Physics, Cambridge University",
        "M.S. in Physics, ETH Zurich",
        "B.S. in Physics, University of Chicago"
      ],
      publications: [
        "The Search for Dark Matter Particles (2022)",
        "Quantum Field Theory Applications in Cosmology (2020)",
        "New Perspectives on the Standard Model (2017)"
      ]
    },
    {
      id: 5,
      name: "Dr. Aisha Patel",
      title: "Associate Professor",
      department: "Medicine",
      image: "https://via.placeholder.com/150?text=Dr.+Patel",
      specializations: ["Immunology", "Infectious Diseases", "Global Health"],
      bio: "Dr. Patel conducts research on immune responses to infectious diseases. Her work has contributed to vaccine development and improving public health strategies globally.",
      email: "apatel@university.edu",
      office: "Medical Sciences Building, Room 412",
      education: [
        "M.D., Johns Hopkins University",
        "Ph.D. in Immunology, Yale University",
        "B.S. in Biology, Duke University"
      ],
      publications: [
        "Immune Response Patterns in Novel Viral Infections (2022)",
        "Vaccine Development for Emerging Infectious Diseases (2021)",
        "Public Health Strategies in Low-Resource Settings (2019)"
      ]
    },
    {
      id: 6,
      name: "Dr. Robert Garcia",
      title: "Professor",
      department: "Environmental Science",
      image: "https://via.placeholder.com/150?text=Dr.+Garcia",
      specializations: ["Climate Change", "Sustainable Development", "Environmental Policy"],
      bio: "Dr. Garcia studies the impacts of climate change on ecosystems and communities. He advises governments on environmental policy and sustainable development strategies.",
      email: "rgarcia@university.edu",
      office: "Environment Building, Room 305",
      education: [
        "Ph.D. in Environmental Science, UC Berkeley",
        "M.S. in Ecology, University of Washington",
        "B.S. in Biology, University of Michigan"
      ],
      publications: [
        "Climate Change Adaptation in Coastal Communities (2022)",
        "Biodiversity Conservation in the Face of Global Warming (2020)",
        "Sustainable Development Goals: Progress and Challenges (2018)"
      ]
    }
  ];

  // Get all departments for filtering
  const departments = [...new Set(facultyMembers.map(member => member.department))];

  // Filter faculty based on search term and department filter
  const filteredFaculty = facultyMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           member.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment = activeFilter === 'all' || member.department === activeFilter;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="faculty-page">
      <Navbar />
      
      <div className="faculty-hero">
        <div className="hero-content">
          <h1>Meet Our Faculty</h1>
          <p>Learn from world-renowned experts and leading researchers in their fields</p>
          
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search by name or specialization..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button><i className="fas fa-search"></i></button>
          </div>
        </div>
      </div>
      
      <div className="faculty-container">
        <div className="department-filter">
          <button 
            className={activeFilter === 'all' ? 'active' : ''} 
            onClick={() => setActiveFilter('all')}
          >
            All Departments
          </button>
          
          {departments.map(department => (
            <button 
              key={department}
              className={activeFilter === department ? 'active' : ''} 
              onClick={() => setActiveFilter(department)}
            >
              {department}
            </button>
          ))}
        </div>
        
        <h2 className="section-title">Faculty Members ({filteredFaculty.length})</h2>
        
        <div className="faculty-grid">
          {filteredFaculty.length > 0 ? (
            filteredFaculty.map(member => (
              <div className="faculty-card" key={member.id}>
                <div className="faculty-header">
                  <div className="faculty-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="faculty-intro">
                    <h3 className="faculty-name">{member.name}</h3>
                    <p className="faculty-title">{member.title}, {member.department}</p>
                    <div className="faculty-contact">
                      <p><i className="far fa-envelope"></i> {member.email}</p>
                      <p><i className="far fa-building"></i> {member.office}</p>
                    </div>
                  </div>
                </div>
                
                <div className="faculty-tags">
                  {member.specializations.map((spec, index) => (
                    <span key={index} className="faculty-tag">{spec}</span>
                  ))}
                </div>
                
                <p className="faculty-bio">{member.bio}</p>
                
                <div className="faculty-sections">
                  <div className="faculty-section">
                    <h4>Education</h4>
                    <ul>
                      {member.education.map((edu, index) => (
                        <li key={index}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="faculty-section">
                    <h4>Selected Publications</h4>
                    <ul>
                      {member.publications.map((pub, index) => (
                        <li key={index}>{pub}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="faculty-actions">
                  <button className="profile-button">Full Profile</button>
                  <button className="contact-button">Contact</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>No faculty members match your criteria</h3>
              <p>Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyPage;
