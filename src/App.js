import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Page from './Page.js';

function Magic8Ball() {
  const [response, setResponse] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [question, setQuestion] = useState('');

  const getMagic8BallResponse = () => {
    const responses = ["Yes", "No", "Maybe", "Ask again later"];
    const randomIndex = Math.floor(Math.random() * responses.length);
    const selectedResponse = responses[randomIndex];
    setResponse(selectedResponse);
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const history = JSON.parse(localStorage.getItem('questionsHistory')) || [];
    history.push({ question, response: selectedResponse, timestamp: new Date() });
    localStorage.setItem('questionsHistory', JSON.stringify(history));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Magic 8 Ball</h1>
      <input 
        type="text" 
        placeholder="Ask your question..." 
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ padding: '10px', width: '300px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} 
      />
      <button onClick={getMagic8BallResponse} disabled={!question}>Ask the Magic 8 Ball</button>
      <div className={`response-box ${isVisible ? 'visible' : 'hidden'}`}>
        <p>{response}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Magic 8 Ball App</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/questions">View Questions</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Magic8Ball />} />
          <Route path="/questions" element={<Page />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
