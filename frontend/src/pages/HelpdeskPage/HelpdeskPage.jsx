import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './HelpdeskPage.css';

const HelpdeskPage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  // Categories for filtering
  const categories = ["All", "Academic", "Campus Life", "Career", "Technical", "Other"];

  // Dummy data - in a real app, you'd fetch this from an API
  useEffect(() => {
    // Simulating API fetch
    const dummyQuestions = [
      {
        id: 1,
        title: "How do I register for classes next semester?",
        body: "I'm confused about the registration process. Can someone explain the steps?",
        author: "freshmanStudent",
        date: "2023-11-15",
        category: "Academic",
        votes: 15,
        answers: 3,
        views: 120
      },
      {
        id: 2,
        title: "What programming language should I learn first?",
        body: "I'm interested in web development but don't know where to start.",
        author: "codeNewbie",
        date: "2023-11-10",
        category: "Technical",
        votes: 25,
        answers: 8,
        views: 310
      },
      {
        id: 3,
        title: "How can I get involved in campus clubs?",
        body: "I want to join some clubs but don't know the process.",
        author: "socialButterfly",
        date: "2023-11-05",
        category: "Campus Life",
        votes: 9,
        answers: 5,
        views: 89
      },
      {
        id: 4,
        title: "What internship opportunities are available for CS students?",
        body: "I'm looking for summer internships in software development.",
        author: "careerFocused",
        date: "2023-11-01",
        category: "Career",
        votes: 18,
        answers: 4,
        views: 205
      },
      {
        id: 5,
        title: "How do I access the university library resources remotely?",
        body: "I need to access journals and databases from home.",
        author: "remoteResearcher",
        date: "2023-10-28",
        category: "Academic",
        votes: 12,
        answers: 2,
        views: 78
      }
    ];

    setQuestions(dummyQuestions);
  }, []);

  // Filter questions based on search term and category
  const filteredQuestions = questions.filter(question => {
    const matchesCategory = activeCategory === "All" || question.category === activeCategory;
    const matchesSearch = searchTerm === "" || 
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.body.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Handle asking a new question
  const handleAskQuestion = () => {
    navigate('/helpdesk/ask');
  };

  return (
    <div className="helpdesk-page">
      <Navbar />
      <div className="helpdesk-hero">
        <div className="hero-content">
          <h1>University Knowledge Base</h1>
          <p>Ask questions, share knowledge, find answers</p>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search questions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button><i className="fas fa-search"></i>Search</button>
          </div>
          <button className="ask-question-btn" onClick={handleAskQuestion}>
            Ask a Question
          </button>
        </div>
      </div>

      <div className="helpdesk-main">
        <div className="sidebar">
          <h3>Categories</h3>
          <ul className="category-list">
            {categories.map(category => (
              <li 
                key={category} 
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className="content">
          <div className="content-header">
            <h2>{activeCategory === "All" ? "All Questions" : `${activeCategory} Questions`}</h2>
            <div className="header-right">
              <span>{filteredQuestions.length} questions</span>
              <button className="ask-question-btn" onClick={handleAskQuestion}>Ask Question</button>
            </div>
          </div>

          <div className="questions-list">
            {filteredQuestions.length === 0 ? (
              <div className="no-questions">
                <h3>No questions found</h3>
                <p>Be the first to ask a question in this category!</p>
                <button className="ask-question-btn" onClick={handleAskQuestion}>Ask Question</button>
              </div>
            ) : (
              filteredQuestions.map(question => (
                <div className="question-card" key={question.id}>
                  <div className="question-stats">
                    <div className="stat">
                      <span className="number">{question.votes}</span>
                      <span className="label">votes</span>
                    </div>
                    <div className="stat">
                      <span className="number">{question.answers}</span>
                      <span className="label">answers</span>
                    </div>
                    <div className="stat">
                      <span className="number">{question.views}</span>
                      <span className="label">views</span>
                    </div>
                  </div>

                  <div className="question-content">
                    <h3>
                      <Link to={`/helpdesk/question/${question.id}`}>{question.title}</Link>
                    </h3>
                    <p className="question-excerpt">{question.body.substring(0, 150)}...</p>
                    <div className="question-meta">
                      <span className="category">{question.category}</span>
                      <span className="author">Posted by {question.author}</span>
                      <span className="date">on {question.date}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpdeskPage;