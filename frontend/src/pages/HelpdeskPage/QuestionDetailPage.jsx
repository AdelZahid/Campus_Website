
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './QuestionDetailPage.css';

const QuestionDetailPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Fetch question and answers - simulating API fetch
  useEffect(() => {
    // In a real app, you would fetch from an API based on the ID
    // Simulating loading delay
    setLoading(true);
    
    setTimeout(() => {
      try {
        // Dummy question data
        const dummyQuestion = {
          id: parseInt(id),
          title: "How do I register for classes next semester?",
          body: "I'm a freshman and I'm confused about the registration process for next semester. I've heard there's a specific window for registration based on credits completed, but I don't know how to find out when my window is. Also, do I need to meet with an advisor before registering? Any tips on getting into popular classes that fill up quickly would be appreciated too.",
          author: "freshmanStudent",
          authorAvatar: "https://i.pravatar.cc/150?img=11",
          date: "2023-11-15",
          category: "Academic",
          votes: 15,
          views: 120,
          tags: ["registration", "courses", "freshman"]
        };
        
        // Dummy answers
        const dummyAnswers = [
          {
            id: 1,
            body: "Registration dates are posted on the university portal about a month before registration begins. Yes, most freshmen are required to meet with an advisor to get a registration PIN. You can schedule this through the advising center. As for popular classes, I recommend having backup options ready in case your first choices are full. Also, sometimes spots open up during the first week of classes as people drop, so keep checking.",
            author: "seniorHelper",
            authorAvatar: "https://i.pravatar.cc/150?img=12",
            date: "2023-11-16",
            votes: 8,
            isAccepted: true
          },
          {
            id: 2,
            body: "To add to the above answer, there's also a waitlist system for many popular courses. If a class is full, you can join the waitlist, and you'll be automatically enrolled if a spot opens up. Just make sure you don't have any schedule conflicts that would prevent the auto-enrollment from working.",
            author: "academicAdvisor",
            authorAvatar: "https://i.pravatar.cc/150?img=13",
            date: "2023-11-17",
            votes: 5,
            isAccepted: false
          },
          {
            id: 3,
            body: "Don't forget to check RateMyProfessors before you register! Some professors teach the same course very differently, and it can make a huge difference in your experience and grade.",
            author: "gradStudent22",
            authorAvatar: "https://i.pravatar.cc/150?img=14",
            date: "2023-11-18",
            votes: 3,
            isAccepted: false
          }
        ];
        
        setQuestion(dummyQuestion);
        setAnswers(dummyAnswers);
        setLoading(false);
      } catch (err) {
        setError("Failed to load question. Please try again later.");
        setLoading(false);
      }
    }, 1000); // Simulate network delay
  }, [id]);
  
  // Handle voting
  const handleVote = (type, id, voteType) => {
    if (type === 'question') {
      setQuestion(prev => ({
        ...prev,
        votes: prev.votes + (voteType === 'up' ? 1 : -1)
      }));
    } else {
      setAnswers(prev => prev.map(answer => 
        answer.id === id 
          ? { ...answer, votes: answer.votes + (voteType === 'up' ? 1 : -1) }
          : answer
      ));
    }
  };
  
  // Handle submitting a new answer
  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    
    if (!newAnswer.trim()) return;
    
    const newAnswerObj = {
      id: answers.length + 1,
      body: newAnswer,
      author: "currentUser", // In a real app, you'd get this from authentication
      authorAvatar: "https://i.pravatar.cc/150?img=15", // Placeholder
      date: new Date().toISOString().split('T')[0],
      votes: 0,
      isAccepted: false
    };
    
    setAnswers([...answers, newAnswerObj]);
    setNewAnswer('');
  };
  
  // Handle marking an answer as accepted
  const handleAcceptAnswer = (id) => {
    setAnswers(prev => prev.map(answer => ({
      ...answer,
      isAccepted: answer.id === id
    })));
  };
  
  if (loading) return (
    <div className="question-detail-page">
      <Navbar />
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading question...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="question-detail-page">
      <Navbar />
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/helpdesk')}>Go Back to Questions</button>
      </div>
    </div>
  );
  
  if (!question) return (
    <div className="question-detail-page">
      <Navbar />
      <div className="error-container">
        <h2>Question Not Found</h2>
        <p>The question you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/helpdesk')}>Go Back to Questions</button>
      </div>
    </div>
  );
  
  return (
    <div className="question-detail-page">
      <Navbar />
      <div className="question-detail-container">
        <div className="breadcrumbs">
          <Link to="/helpdesk">Helpdesk</Link> &gt; <span>{question.category}</span> &gt; <span>Question {question.id}</span>
        </div>
        
        {/* Question Section */}
        <div className="question-section">
          <div className="question-header">
            <h1>{question.title}</h1>
            <div className="question-meta">
              <span>Asked on {question.date}</span>
              <span>Viewed {question.views} times</span>
            </div>
          </div>
          
          <div className="question-content">
            <div className="vote-controls">
              <button onClick={() => handleVote('question', question.id, 'up')} className="vote-btn up-vote">
                <i className="fas fa-chevron-up"></i>
              </button>
              <span className="vote-count">{question.votes}</span>
              <button onClick={() => handleVote('question', question.id, 'down')} className="vote-btn down-vote">
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>
            
            <div className="content-body">
              <p>{question.body}</p>
              
              <div className="tags">
                {question.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              
              <div className="question-footer">
                <div className="share-btn">
                  <i className="fas fa-share"></i> Share
                </div>
                <div className="author-info">
                  <span>Asked by</span>
                  <div className="avatar">
                    <img src={question.authorAvatar} alt={question.author} />
                  </div>
                  <span className="author-name">{question.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Answers Section */}
        <div className="answers-section">
          <h2>{answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}</h2>
          
          {answers.map(answer => (
            <div key={answer.id} className={`answer ${answer.isAccepted ? 'accepted' : ''}`}>
              {answer.isAccepted && (
                <div className="accepted-badge">
                  <i className="fas fa-check"></i> Accepted Answer
                </div>
              )}
              
              <div className="answer-content">
                <div className="vote-controls">
                  <button onClick={() => handleVote('answer', answer.id, 'up')} className="vote-btn up-vote">
                    <i className="fas fa-chevron-up"></i>
                  </button>
                  <span className="vote-count">{answer.votes}</span>
                  <button onClick={() => handleVote('answer', answer.id, 'down')} className="vote-btn down-vote">
                    <i className="fas fa-chevron-down"></i>
                  </button>
                  
                  {answer.author !== question.author && !answers.some(a => a.isAccepted) && (
                    <button 
                      onClick={() => handleAcceptAnswer(answer.id)} 
                      className="accept-btn"
                      title="Mark as accepted answer"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                  )}
                </div>
                
                <div className="content-body">
                  <p>{answer.body}</p>
                  
                  <div className="answer-footer">
                    <div className="answer-actions">
                      <button>
                        <i className="fas fa-flag"></i> Report
                      </button>
                    </div>
                    <div className="author-info">
                      <span>Answered on {answer.date} by</span>
                      <div className="avatar">
                        <img src={answer.authorAvatar} alt={answer.author} />
                      </div>
                      <span className="author-name">{answer.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Submit Answer Form */}
        <div className="submit-answer-section">
          <h3>Your Answer</h3>
          <form onSubmit={handleSubmitAnswer}>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Write your answer here..."
              rows="6"
              required
            ></textarea>
            <button type="submit" className="submit-btn">
              Post Your Answer
            </button>
          </form>
          
          <div className="answer-guidelines">
            <h4>How to write a good answer:</h4>
            <ul>
              <li>Answer the question directly and clearly</li>
              <li>Provide explanations, not just statements</li>
              <li>Support your answer with examples or references when possible</li>
              <li>Be respectful and constructive</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetailPage;
