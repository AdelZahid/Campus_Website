
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('trending');
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Connect with your Campus Community</h1>
          <p>Discover universities, join clubs, access resources, and connect with peers all in one place.</p>
          <div className="hero-buttons">
            <Link to="/university" className="primary-btn">Explore Universities</Link>
            <Link to="/clubs" className="secondary-btn">Join Clubs</Link>
          </div>
        </div>
        <div className="hero-image"></div>
      </div>
      
      <div className="features-section">
        <div className="section-header">
          <h2>Everything you need for your campus life</h2>
          <p>All the tools to make your academic journey successful and enjoyable</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-university"></i>
            </div>
            <h3>Universities</h3>
            <p>Explore top universities, browse programs, and find your perfect academic fit.</p>
            <Link to="/university" className="feature-link">Learn more <i className="fas fa-arrow-right"></i></Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Clubs</h3>
            <p>Join student organizations, participate in events, and build your network.</p>
            <Link to="/clubs" className="feature-link">Learn more <i className="fas fa-arrow-right"></i></Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-book"></i>
            </div>
            <h3>Library</h3>
            <p>Access digital resources, borrow books, and find study materials.</p>
            <Link to="/library" className="feature-link">Learn more <i className="fas fa-arrow-right"></i></Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-question-circle"></i>
            </div>
            <h3>Helpdesk</h3>
            <p>Ask questions, get answers, and share knowledge with peers and experts.</p>
            <Link to="/helpdesk" className="feature-link">Learn more <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>
      </div>
      
      <div className="activity-feed-section">
        <div className="section-header">
          <h2>Campus Activity Feed</h2>
          <div className="feed-tabs">
            <button 
              className={activeTab === 'trending' ? 'active' : ''} 
              onClick={() => setActiveTab('trending')}
            >
              Trending
            </button>
            <button 
              className={activeTab === 'latest' ? 'active' : ''} 
              onClick={() => setActiveTab('latest')}
            >
              Latest
            </button>
            <button 
              className={activeTab === 'nearby' ? 'active' : ''} 
              onClick={() => setActiveTab('nearby')}
            >
              Nearby
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading campus activities...</p>
          </div>
        ) : (
          <div className="feed-grid">
            {/* Post 1 */}
            <div className="feed-card">
              <div className="feed-header">
                <div className="user-info">
                  <div className="user-avatar">
                    <img src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff" alt="User" />
                  </div>
                  <div>
                    <h4>Sarah Johnson</h4>
                    <span>Computer Science • Harvard University</span>
                  </div>
                </div>
                <span className="post-time">2 hours ago</span>
              </div>
              <div className="feed-content">
                <p>Just submitted my research paper on AI Ethics! Looking forward to the conference next month. #AIEthics #ComputerScience</p>
                <div className="feed-image" style={{backgroundImage: `url(https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80)`}}></div>
              </div>
              <div className="feed-actions">
                <button><i className="fas fa-heart"></i> 45</button>
                <button><i className="fas fa-comment"></i> 12</button>
                <button><i className="fas fa-share"></i> Share</button>
              </div>
            </div>
            
            {/* Post 2 */}
            <div className="feed-card">
              <div className="feed-header">
                <div className="user-info">
                  <div className="user-avatar">
                    <img src="https://ui-avatars.com/api/?name=Campus+Club&background=e74c3c&color=fff" alt="Club" />
                  </div>
                  <div>
                    <h4>MIT Robotics Club</h4>
                    <span>Club • MIT</span>
                  </div>
                </div>
                <span className="post-time">5 hours ago</span>
              </div>
              <div className="feed-content">
                <p>Our annual robotics competition is happening next week! Register now to participate or come watch the future of robotics unfold!</p>
                <div className="feed-image" style={{backgroundImage: `url(https://images.unsplash.com/photo-1561144257-e32e8506aa6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80)`}}></div>
              </div>
              <div className="feed-actions">
                <button><i className="fas fa-heart"></i> 87</button>
                <button><i className="fas fa-comment"></i> 23</button>
                <button><i className="fas fa-share"></i> Share</button>
              </div>
            </div>
            
            {/* Post 3 */}
            <div className="feed-card event-card">
              <div className="event-badge">Event</div>
              <div className="feed-header">
                <div className="user-info">
                  <div className="user-avatar">
                    <img src="https://ui-avatars.com/api/?name=Stanford&background=8e44ad&color=fff" alt="University" />
                  </div>
                  <div>
                    <h4>Stanford University</h4>
                    <span>University • Palo Alto, CA</span>
                  </div>
                </div>
                <span className="post-time">1 day ago</span>
              </div>
              <div className="feed-content">
                <h3 className="event-title">Fall Career Fair 2023</h3>
                <p>Join us for our biggest career fair of the year! Over 200 companies will be present to recruit for internships and full-time positions.</p>
                <div className="event-details">
                  <div><i className="fas fa-calendar"></i> October 15, 2023</div>
                  <div><i className="fas fa-clock"></i> 10:00 AM - 4:00 PM</div>
                  <div><i className="fas fa-map-marker-alt"></i> Stanford Memorial Hall</div>
                </div>
              </div>
              <div className="feed-actions">
                <button className="interested-btn"><i className="fas fa-star"></i> Interested</button>
                <button><i className="fas fa-share"></i> Share</button>
              </div>
            </div>
            
            {/* Post 4 */}
            <div className="feed-card">
              <div className="feed-header">
                <div className="user-info">
                  <div className="user-avatar">
                    <img src="https://ui-avatars.com/api/?name=John+Smith&background=27ae60&color=fff" alt="User" />
                  </div>
                  <div>
                    <h4>John Smith</h4>
                    <span>Business Administration • UC Berkeley</span>
                  </div>
                </div>
                <span className="post-time">2 days ago</span>
              </div>
              <div className="feed-content">
                <p>Looking for study partners for the upcoming finance exam! Anyone in Professor Wilson's class interested in meeting at the library tomorrow?</p>
              </div>
              <div className="feed-actions">
                <button><i className="fas fa-heart"></i> 18</button>
                <button><i className="fas fa-comment"></i> 32</button>
                <button><i className="fas fa-share"></i> Share</button>
              </div>
            </div>
          </div>
        )}
        
        <div className="view-more-container">
          <button className="view-more-btn">Load More</button>
        </div>
      </div>
      
      <div className="stats-section">
        <div className="stat-card">
          <h3>1000+</h3>
          <p>Universities</p>
        </div>
        <div className="stat-card">
          <h3>50,000+</h3>
          <p>Active Students</p>
        </div>
        <div className="stat-card">
          <h3>5,000+</h3>
          <p>Student Clubs</p>
        </div>
        <div className="stat-card">
          <h3>10,000+</h3>
          <p>Resources</p>
        </div>
      </div>
      
      <footer className="homepage-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logo.png" alt="Campus Connect Logo" />
            <p>Connecting students and universities around the world.</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Platform</h4>
              <ul>
                <li><Link to="/university">Universities</Link></li>
                <li><Link to="/clubs">Clubs</Link></li>
                <li><Link to="/library">Library</Link></li>
                <li><Link to="/helpdesk">Helpdesk</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/community-guidelines">Community Guidelines</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2023 Campus Connect. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
