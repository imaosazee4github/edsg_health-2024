import React from 'react';

const Question = ({ question, answer, onChange }) => {
  return (
    <div className="question">
      <label>{question.text}</label>
      {question.type === 'multiple-choice' ? (
        <div>
          {question.options.map((option) => (
            <label key={option}>
              <input 
                type="radio" 
                value={option} 
                checked={answer === option} 
                onChange={() => onChange(option)} 
              />
              {option}
            </label>
          ))}
        </div>
      ) : (
        <input 
          type="text" 
          value={answer || ''} 
          onChange={(e) => onChange(e.target.value)} 
        />
      )}
    </div>
  );
};

export default Question;
