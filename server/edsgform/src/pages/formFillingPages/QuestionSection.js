import React from 'react';
import Question from './Question';

const QuestionSection = ({ section, responses, onChange, onNext, onBack }) => {
  const isAllAnswered = section.questions.every((q) => responses[q.id]);

  return (
    <div className="question-section">
      <h2>{section.title}</h2>
      {section.questions.map((question) => (
        <Question 
          key={question.id} 
          question={question} 
          answer={responses[question.id]} 
          onChange={(answer) => onChange(question.id, answer)}
        />
      ))}
      <button onClick={onBack} disabled={!section.previous}>Back</button>
      <button onClick={onNext} disabled={!isAllAnswered}>Next</button>
    </div>
  );
};

export default QuestionSection;
