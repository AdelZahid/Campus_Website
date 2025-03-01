import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";

const POSTS_PER_PAGE = 6;

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("trending");
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mock data for each tab
  const mockTrendingPosts = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar:
          "https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff",
        university: "Harvard University",
        department: "Computer Science",
      },
      content:
        "Just submitted my research paper on AI Ethics! Looking forward to the conference next month. #AIEthics #ComputerScience",
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 145,
      comments: 23,
      time: "2 hours ago",
    },
    {
      id: 2,
      user: {
        name: "Michael Thompson",
        avatar:
          "https://ui-avatars.com/api/?name=Michael+Thompson&background=21a663&color=fff",
        university: "MIT",
        department: "Electrical Engineering",
      },
      content:
        "Our robotics team just qualified for the finals! So proud of everyones hard work and dedication. #Robotics #MIT",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 210,
      comments: 42,
      time: "5 hours ago",
    },
    {
      id: 3,
      user: {
        name: "Jessica Lee",
        avatar:
          "https://ui-avatars.com/api/?name=Jessica+Lee&background=D83A56&color=fff",
        university: "Stanford University",
        department: "Business Administration",
      },
      content:
        "Just received an internship offer from Google! All those late nights studying finally paid off. #Google #Internship",
      image:
        "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 320,
      comments: 56,
      time: "1 day ago",
    },
    {
      id: 4,
      user: {
        name: "Daniel Kim",
        avatar:
          "https://ui-avatars.com/api/?name=Daniel+Kim&background=14643b&color=fff",
        university: "UC Berkeley",
        department: "Physics",
      },
      content:
        "Our paper on quantum computing got published in Nature! Check it out if youre interested in the future of computing. #QuantumComputing #Physics",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 187,
      comments: 34,
      time: "2 days ago",
    },
    {
      id: 5,
      user: {
        name: "Emily Wilson",
        avatar:
          "https://ui-avatars.com/api/?name=Emily+Wilson&background=FF8C32&color=fff",
        university: "Princeton University",
        department: "Environmental Science",
      },
      content:
        "Just started my fieldwork in the Amazon rainforest! Will be documenting the biodiversity here for the next 3 months. #Biodiversity #Amazon",
      image:
        "https://images.unsplash.com/photo-1516893842880-5d8aada7ac05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 246,
      comments: 29,
      time: "3 days ago",
    },
    {
      id: 6,
      user: {
        name: "Brandon Taylor",
        avatar:
          "https://ui-avatars.com/api/?name=Brandon+Taylor&background=21a663&color=fff",
        university: "Yale University",
        department: "Medicine",
      },
      content:
        "Passed my medical boards with flying colors! One step closer to becoming a doctor. #Medicine #MedSchool",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 301,
      comments: 47,
      time: "4 days ago",
    },
    {
      id: 7,
      user: {
        name: "Sophia Martinez",
        avatar:
          "https://ui-avatars.com/api/?name=Sophia+Martinez&background=0D8ABC&color=fff",
        university: "Columbia University",
        department: "Journalism",
      },
      content:
        "My article on climate change was featured in The New York Times! So grateful for this opportunity. #Journalism #ClimateChange",
      image:
        "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 278,
      comments: 39,
      time: "5 days ago",
    },
    {
      id: 8,
      user: {
        name: "Ryan Patel",
        avatar:
          "https://ui-avatars.com/api/?name=Ryan+Patel&background=14643b&color=fff",
        university: "University of Chicago",
        department: "Economics",
      },
      content:
        "Just got accepted into the PhD program at University of Chicago! Excited to start this new chapter. #Economics #PhD",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 167,
      comments: 21,
      time: "1 week ago",
    },
  ];

  const mockLatestPosts = [
    {
      id: 9,
      user: {
        name: "Emma Davis",
        avatar:
          "https://ui-avatars.com/api/?name=Emma+Davis&background=21a663&color=fff",
        university: "UCLA",
        department: "Film Studies",
      },
      content:
        "Just submitted my short film to the university festival! Fingers crossed it gets selected. #FilmStudies #ShortFilm",
      image:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 123,
      comments: 18,
      time: "30 minutes ago",
    },
    {
      id: 10,
      user: {
        name: "Alexander Wang",
        avatar:
          "https://ui-avatars.com/api/?name=Alexander+Wang&background=14643b&color=fff",
        university: "Cornell University",
        department: "Architecture",
      },
      content:
        "Just completed my final architecture project! After 200+ hours, its finally done. #Architecture #Design",
      image:
        "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 156,
      comments: 27,
      time: "1 hour ago",
    },
    {
      id: 11,
      user: {
        name: "Olivia Rodriguez",
        avatar:
          "https://ui-avatars.com/api/?name=Olivia+Rodriguez&background=0D8ABC&color=fff",
        university: "NYU",
        department: "Psychology",
      },
      content:
        "Just wrapped up my research on cognitive biases! The findings are fascinating. #Psychology #Research",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 178,
      comments: 31,
      time: "2 hours ago",
    },
    {
      id: 12,
      user: {
        name: "William Chen",
        avatar:
          "https://ui-avatars.com/api/?name=William+Chen&background=21a663&color=fff",
        university: "Duke University",
        department: "Mathematics",
      },
      content:
        "Just solved a math problem thats been giving me trouble for weeks! The feeling of breakthrough is amazing. #Mathematics #ProblemSolving",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 142,
      comments: 19,
      time: "3 hours ago",
    },
    {
      id: 13,
      user: {
        name: "Sofia Garcia",
        avatar:
          "https://ui-avatars.com/api/?name=Sofia+Garcia&background=D83A56&color=fff",
        university: "University of Michigan",
        department: "Sociology",
      },
      content:
        "Just presented my research on social media impact at the sociology conference! Got some great feedback. #Sociology #SocialMedia",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 195,
      comments: 36,
      time: "4 hours ago",
    },
    {
      id: 14,
      user: {
        name: "Mason Scott",
        avatar:
          "https://ui-avatars.com/api/?name=Mason+Scott&background=14643b&color=fff",
        university: "University of Washington",
        department: "Engineering",
      },
      content:
        "Our engineering team just won the robotics competition! Hard work pays off. #Engineering #Robotics",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 231,
      comments: 42,
      time: "6 hours ago",
    },
  ];

  const mockNearbyPosts = [
    {
      id: 15,
      user: {
        name: "James Wilson",
        avatar:
          "https://ui-avatars.com/api/?name=James+Wilson&background=21a663&color=fff",
        university: "Local Community College",
        department: "Liberal Arts",
      },
      content:
        "The campus art exhibition is happening this weekend! Dont miss out on seeing amazing student artwork. #Art #Exhibition",
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 87,
      comments: 14,
      time: "1 hour ago",
    },
    {
      id: 16,
      user: {
        name: "Ava Robinson",
        avatar:
          "https://ui-avatars.com/api/?name=Ava+Robinson&background=0D8ABC&color=fff",
        university: "State University",
        department: "Biology",
      },
      content:
        "Theres a career fair happening next week on campus! Great opportunity to network with potential employers. #CareerFair #Networking",
      image:
        "https://images.unsplash.com/photo-1560523159-4a9692d222f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 112,
      comments: 23,
      time: "3 hours ago",
    },
    {
      id: 17,
      user: {
        name: "Ethan Brown",
        avatar:
          "https://ui-avatars.com/api/?name=Ethan+Brown&background=14643b&color=fff",
        university: "City University",
        department: "History",
      },
      content:
        "The history department is hosting a lecture on ancient civilizations tomorrow at 5 PM in Hall B. Everyone is welcome! #History #Lecture",
      image:
        "https://images.unsplash.com/photo-1533854775446-95c4609da544?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 76,
      comments: 11,
      time: "5 hours ago",
    },
    {
      id: 18,
      user: {
        name: "Isabella Lopez",
        avatar:
          "https://ui-avatars.com/api/?name=Isabella+Lopez&background=21a663&color=fff",
        university: "Metropolitan University",
        department: "Music",
      },
      content:
        "Student concert this Friday at 7 PM! Come support your fellow students and enjoy a night of beautiful music. #Music #Concert",
      image:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 93,
      comments: 17,
      time: "6 hours ago",
    },
    {
      id: 19,
      user: {
        name: "Noah Clark",
        avatar:
          "https://ui-avatars.com/api/?name=Noah+Clark&background=D83A56&color=fff",
        university: "Tech Institute",
        department: "Computer Engineering",
      },
      content:
        "Hackathon happening this weekend at the Tech Building! Form your teams and register now. Prizes worth $5,000 up for grabs! #Hackathon #Coding",
      image:
        "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      likes: 158,
      comments: 29,
      time: "8 hours ago",
    },
  ];

  useEffect(() => {
    // Simulate loading data when tab changes
    setIsLoading(true);
    setPage(1);

    // Select data based on active tab
    let selectedPosts = [];
    switch (activeTab) {
      case "trending":
        selectedPosts = [...mockTrendingPosts];
        break;
      case "latest":
        selectedPosts = [...mockLatestPosts];
        break;
      case "nearby":
        selectedPosts = [...mockNearbyPosts];
        break;
      default:
        selectedPosts = [...mockTrendingPosts];
    }

    setPosts(selectedPosts);

    // Show initial batch of posts
    const timer = setTimeout(() => {
      setVisiblePosts(selectedPosts.slice(0, POSTS_PER_PAGE));
      setHasMore(selectedPosts.length > POSTS_PER_PAGE);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const loadMorePosts = () => {
    const nextPage = page + 1;
    const startIndex = 0;
    const endIndex = nextPage * POSTS_PER_PAGE;

    setVisiblePosts(posts.slice(startIndex, endIndex));
    setPage(nextPage);
    setHasMore(endIndex < posts.length);
  };

  return (
    <div className="homepage">
      <Navbar />
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Connect with Your Campus Community</h1>
          <p className="hero-subtitle">
            Join thousands of students, clubs, and universities on the ultimate
            campus platform.
          </p>
          <div className="hero-buttons">
            <button className="hero-btn">Get Started</button>
            <button className="hero-btn secondary">Learn More</button>
          </div>
        </div>
      </section>

      <div className="features-section">
        <div className="section-heading">
          <h2>Everything You Need for Campus Life</h2>
          <p>
            Discover features designed to enhance your university experience
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-university"></i>
            </div>
            <h3>Universities</h3>
            <p>
              Explore universities, connect with alumni, and access resources.
            </p>
            <Link to="/university" className="feature-link">
              Learn more <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Clubs & Organizations</h3>
            <p>
              Join student organizations, participate in events, and build your
              network.
            </p>
            <Link to="/clubs" className="feature-link">
              Learn more <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-book"></i>
            </div>
            <h3>Library</h3>
            <p>
              Access digital resources, borrow books, and find study materials.
            </p>
            <Link to="/library" className="feature-link">
              Learn more <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-question-circle"></i>
            </div>
            <h3>Helpdesk</h3>
            <p>
              Ask questions, get answers, and share knowledge with peers and
              experts.
            </p>
            <Link to="/helpdesk" className="feature-link">
              Learn more <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>

      <div className="activity-feed-section">
        <div className="feed-container">
          <div className="section-header">
            <h2>Campus Activity Feed</h2>
            <div className="feed-tabs">
              <button
                className={activeTab === "trending" ? "active" : ""}
                onClick={() => setActiveTab("trending")}
              >
                Trending
              </button>
              <button
                className={activeTab === "latest" ? "active" : ""}
                onClick={() => setActiveTab("latest")}
              >
                Latest
              </button>
              <button
                className={activeTab === "nearby" ? "active" : ""}
                onClick={() => setActiveTab("nearby")}
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
              {visiblePosts.map((post) => (
                <div className="feed-card" key={post.id}>
                  <div className="feed-header">
                    <div className="user-info">
                      <div className="user-avatar">
                        <img src={post.user.avatar} alt={post.user.name} />
                      </div>
                      <div>
                        <h4>{post.user.name}</h4>
                        <span>
                          {post.user.department} • {post.user.university}
                        </span>
                      </div>
                    </div>
                    <span className="post-time">{post.time}</span>
                  </div>
                  <div className="feed-content">
                    <p>{post.content}</p>
                    {post.image && (
                      <div className="feed-image">
                        <img src={post.image} alt="Post content" />
                      </div>
                    )}
                  </div>
                  <div className="feed-actions">
                    <button className="action-btn">
                      <i className="far fa-heart"></i> {post.likes}
                    </button>
                    <button className="action-btn">
                      <i className="far fa-comment"></i> {post.comments}
                    </button>
                    <button className="action-btn">
                      <i className="far fa-share-square"></i> Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && hasMore && (
            <div className="view-more-container">
              <button className="view-more-btn" onClick={loadMorePosts}>
                Load More
              </button>
            </div>
          )}
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

      <Footer />
    </div>
  );
};

export default HomePage;
