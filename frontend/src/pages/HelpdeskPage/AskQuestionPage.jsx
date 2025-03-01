
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './AskQuestionPage.css';

const AskQuestionPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    category: '',
    tags: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const categories = ["Academic", "Campus Life", "Career", "Technical", "Other"];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 15) {
      newErrors.title = 'Title should be at least 15 characters';
    }
    
    if (!formData.body.trim()) {
      newErrors.body = 'Question details are required';
    } else if (formData.body.length < 30) {
      newErrors.body = 'Please provide more details (at least 30 characters)';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // In a real app, you would submit to an API here
      console.log('Submitting question:', formData);
      
      // Redirect to the questions list (or to the new question)
      alert('Your question has been submitted!');
      navigate('/helpdesk');
    }
  };
  
  const handleCancel = () => {
    navigate('/helpdesk');
  };
  
  return (
    <div className="ask-question-page">
      <Navbar />
      <div className="ask-question-container">
        <div className="ask-question-header">
          <h1>Ask a Question</h1>
          <p>Get help from the community by asking a well-formulated question</p>
        </div>
        
        <form className="question-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title <span className="required">*</span></label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What's your question? Be specific."
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <div className="error-message">{errors.title}</div>}
            <div className="input-tip">
              Your title should summarize the problem. Example: "How do I register for engineering courses?"
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="body">Question Details <span className="required">*</span></label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="Provide details about your question..."
              rows="10"
              className={errors.body ? 'error' : ''}
            ></textarea>
            {errors.body && <div className="error-message">{errors.body}</div>}
            <div className="input-tip">
              Explain what you're trying to do, what you've tried, and include any relevant details.
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category <span className="required">*</span></label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <div className="error-message">{errors.category}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Add comma-separated tags (e.g., registration, courses, semester)"
            />
            <div className="input-tip">
              Tags help categorize your question and make it more discoverable.
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="submit-btn">Post Your Question</button>
          </div>
        </form>
        
        <div className="question-guidelines">
          <h3>Tips for asking a good question:</h3>
          <ul>
            <li>Check if a similar question has already been asked</li>
            <li>Be clear and concise</li>
            <li>Provide enough details to understand the problem</li>
            <li>Use proper formatting and keep it organized</li>
            <li>Be respectful and maintain a constructive tone</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionPage;
