import Navbar from '../../components/Navbar/Navbar'
import React, { useState } from 'react';
import './HelpdeskPage.css';

const HelpdeskPage = () => {

    const [questions, setQuestions] = useState([]);
            const [newQuestion, setNewQuestion] = useState('');
            const [newAnswer, setNewAnswer] = useState('');
            const [selectedQuestion, setSelectedQuestion] = useState(null);

            const handleAddQuestion = () => {
                setQuestions([...questions, { question: newQuestion, answers: [] }]);
                setNewQuestion('');
            };

            const handleAddAnswer = () => {
                const updatedQuestions = questions.map((q, index) => {
                    if (index === selectedQuestion) {
                        return { ...q, answers: [...q.answers, newAnswer] };
                    }
                    return q;
                });
                setQuestions(updatedQuestions);
                setNewAnswer('');
                setSelectedQuestion(null);
            };

  return (
    <div>
      <Navbar />
      <h1 >Helpdesk Page</h1>
                    <div className="helpdesk-container">
                        <h2>Ask a Question</h2>
                        <input 
                            type="text"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            placeholder="Type your question here"
                        />
                        <button onClick={handleAddQuestion} >Add Question</button>
                    </div>
                    <div className="helpdesk-container">
                        <h2 >Answer a Question</h2>
                        <select onChange={(e) => setSelectedQuestion(e.target.value)}>
                            <option value="">Select a question</option>
                            {questions.map((q, index) => (
                                <option key={index} value={index}>
                                    {q.question}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                            placeholder="Type your answer here"
                        />
                        <button onClick={handleAddAnswer}>Add Answer</button>
                    </div>
                    <div>
                        <h2>Feed</h2>
                        {questions.map((q, index) => (
                            <div key={index}>
                                <h3>{q.question}</h3>
                                {q.answers.map((answer, i) => (
                                    <p key={i}>{answer}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

        export default HelpdeskPage;
