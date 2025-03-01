
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './ProjectDetailPage.css';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  
  // Sample project data - in a real app, fetch based on projectId
  const project = {
    id: projectId,
    title: 'AI-Powered Study Assistant',
    description: 'A machine learning application that helps students organize study materials and provides personalized learning recommendations based on their learning style and progress.',
    longDescription: `This project addresses the challenge many students face in organizing their study materials and finding effective learning strategies. The AI-Powered Study Assistant uses machine learning algorithms to analyze a student's learning patterns, strengths, and weaknesses to provide tailored recommendations.

    The system can process various types of learning materials including PDFs, videos, and notes, then organize them into a coherent structure. It tracks progress over time and adapts its recommendations accordingly.

    Key features include:
    - Smart content organization
    - Personalized study schedules
    - Learning style assessment
    - Progress tracking and analytics
    - Customized practice questions
    - Collaborative study groups`,
    technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'MongoDB', 'AWS'],
    image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
    ],
    createdAt: 'January 15, 2023',
    updatedAt: 'March 20, 2023',
    status: 'In Progress',
    links: {
      github: 'https://github.com/username/ai-study-assistant',
      demo: 'https://ai-study-assistant.example.com',
      documentation: 'https://docs.ai-study-assistant.example.com'
    },
    team: [
      {
        name: 'Sarah Johnson',
        role: 'Project Lead & ML Engineer',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80'
      },
      {
        name: 'Michael Chen',
        role: 'Frontend Developer',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80'
      },
      {
        name: 'Priya Patel',
        role: 'Backend Developer',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80'
      }
    ]
  };

  return (
    <div className="project-detail-page">
      <Navbar />
      
      <div className="project-banner" style={{ backgroundImage: `url(${project.image})` }}>
        <div className="banner-overlay">
          <div className="container">
            <div className="project-title">
              <h1>{project.title}</h1>
              <div className="project-meta">
                <span><i className="fas fa-calendar"></i> Created: {project.createdAt}</span>
                <span><i className="fas fa-clock"></i> Last updated: {project.updatedAt}</span>
                <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="project-content container">
        <div className="project-content-grid">
          <div className="project-description">
            <div className="section-card">
              <h2>Overview</h2>
              <p className="project-short-description">{project.description}</p>
              <div className="project-long-description">
                {project.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            <div className="section-card">
              <h2>Project Gallery</h2>
              <div className="project-gallery">
                {project.gallery.map((image, index) => (
                  <div key={index} className="gallery-image">
                    <img src={image} alt={`Project screenshot ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="section-card">
              <h2>Team Members</h2>
              <div className="team-members">
                {project.team.map((member, index) => (
                  <div key={index} className="team-member">
                    <img src={member.image} alt={member.name} className="member-image" />
                    <div className="member-info">
                      <h4>{member.name}</h4>
                      <p>{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="project-sidebar">
            <div className="section-card">
              <h3>Technologies</h3>
              <div className="technologies-list">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="section-card">
              <h3>Links</h3>
              <ul className="project-links">
                {project.links.github && (
                  <li>
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github"></i> GitHub Repository
                    </a>
                  </li>
                )}
                {project.links.demo && (
                  <li>
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-external-link-alt"></i> Live Demo
                    </a>
                  </li>
                )}
                {project.links.documentation && (
                  <li>
                    <a href={project.links.documentation} target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-book"></i> Documentation
                    </a>
                  </li>
                )}
              </ul>
            </div>
            
            <div className="section-card">
              <h3>Actions</h3>
              <div className="project-actions">
                <Link to={`/projects/${project.id}/edit`} className="edit-project-btn">
                  <i className="fas fa-edit"></i> Edit Project
                </Link>
                <button className="contact-team-btn">
                  <i className="fas fa-envelope"></i> Contact Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
