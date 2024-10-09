import React, { useEffect, useState } from 'react';

const Page = () => {
  const [questions, setQuestions] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem('questionsHistory')) || [];
    setQuestions(savedQuestions);
  }, []);

  return (
    <div>
      <h2>Questions History</h2>
      <ul>
        {questions.length > 0 ? (
          questions.map((item, index) => (
            <li key={index}>
              <strong>Question:</strong> {item.question} <br />
              <strong>Answer:</strong> {item.response} <br />
              <strong>Time:</strong> {new Date(item.timestamp).toLocaleString()}
            </li>
          ))
        ) : (
          <p>No questions asked yet.</p>
        )}
      </ul>
      <label>
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={() => setIsPrivate(!isPrivate)}
        />
        Private
      </label>
    </div>
  );
};

export default Page;
