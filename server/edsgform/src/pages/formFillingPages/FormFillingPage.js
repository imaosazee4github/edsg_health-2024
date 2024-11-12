import React, { useState, useEffect } from 'react';
import QuestionSection from './QuestionSection';
import ConditionalNavigator from './ConditionalNavigator';

const FormFillingPage = ({ formData }) => {
  const [responses, setResponses] = useState({});
  const [currentSection, setCurrentSection] = useState(formData.sections[0]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleResponseChange = (questionId, answer) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: answer,
    }));
  };

  const handleNextSection = () => {
    const nextSection = ConditionalNavigator.getNextSection(currentSection, responses);
    if (nextSection === "end") {
      handleSubmit();
    } else {
      setCurrentSection(nextSection);
    }
  };

  const handlePreviousSection = () => {
    const prevSection = ConditionalNavigator.getPreviousSection(currentSection, responses);
    if (prevSection) setCurrentSection(prevSection);
  };

  const handleSubmit = () => {
    setEndTime(Date.now());
    const timeTaken = (endTime - startTime) / 1000;
    console.log('Form Submitted:', { responses, timeTaken });
    // Send `responses` and `timeTaken` to the backend here.
  };

  return (
    <div className="form-filling-page">
      <h1>{formData.title}</h1>
      <QuestionSection 
        section={currentSection} 
        responses={responses} 
        onChange={handleResponseChange} 
        onNext={handleNextSection} 
        onBack={handlePreviousSection}
      />
    </div>
  );
};

export default FormFillingPage;