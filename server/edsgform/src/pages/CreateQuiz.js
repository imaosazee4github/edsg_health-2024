import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import './CreateQuiz.css';

const CreateQuiz = () => {
  const [sections, setSections] = useState([{ id: 1, questions: [] }]);
  const [sectionCounter, setSectionCounter] = useState(2);

  const addSection = () => {
    setSections([...sections, { id: sectionCounter, questions: [] }]);
    setSectionCounter(sectionCounter + 1);
  };

  const addQuestion = (sectionId) => {
    const newSections = sections.map((section) => {
      if (section.id === sectionId) {
        section.questions.push({
          id: Date.now(),
          text: '',
          type: 'text', // default question type
          options: [],
          points: 0,
          nextSection: null // new property to track path
        });
      }
      return section;
    });
    setSections(newSections);
  };

  const addOption = (sectionId, questionId) => {
    const newSections = sections.map((section) => {
      if (section.id === sectionId) {
        section.questions = section.questions.map((question) => {
          if (question.id === questionId && question.type === 'multiple') {
            question.options.push({
              id: Date.now(),
              text: '',
              points: 0,
              nextSection: null, // New field to assign a path for each option
              feedback: '' // New field to store feedback
            });
          }
          return question;
        });
      }
      return section;
    });
    setSections(newSections);
  };

  const handleNextSectionChange = (sectionId, questionId, optionId, nextSectionId) => {
    const newSections = sections.map((section) => {
      if (section.id === sectionId) {
        section.questions = section.questions.map((question) => {
          if (question.id === questionId && question.type === 'multiple') {
            question.options = question.options.map((option) => {
              if (option.id === optionId) {
                option.nextSection = nextSectionId;
              }
              return option;
            });
          }
          return question;
        });
      }
      return section;
    });
    setSections(newSections);
  };

  // Function to handle submit
  const submitForm = async() => {
    try {
        // 1. Collect answers from the form
        const formData = {};
        const questions = document.querySelectorAll('.question-card');
        
        questions.forEach((question, index) => {
          const input = question.querySelector('input, select'); // Handle text, number, and dropdown

          // Retrieve the answer based on the input type
          if (input) {
              if (input.type === 'text' || input.type === 'number') {
                  // For text or number inputs
                  formData[`question${index + 1}`] = input.value || "No answer";
              } else if (input.tagName === 'SELECT') {
                  // For dropdown (select) inputs
                  formData[`question${index + 1}`] = input.value || "No answer";
              }
          }
        });

        // 2. Prepare data for MongoDB
        const response = await fetch('https://your-backend-api.com/save-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // 3. Confirm success and notify the user
        if (response.ok) {
            alert("Your quiz has been submitted successfully!");
        } else {
            throw new Error("Failed to submit the quiz. Please try again.");
        }
    } catch (error) {
        alert("There was an error submitting your quiz. Please try again.");
        console.error(error);
    }
  }


  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>Create Your Evaluation Form</h1>
      </div>

      {sections.map((section) => (
        <div key={section.id} className="quiz-section">
          <h2>Section {section.id}</h2>
          

          {section.questions.map((question) => (
            <div key={question.id} className="question-container">
              <textarea
                placeholder="Enter your question"
                value={question.text}
                onInput={(e) => {
                  const newSections = [...sections];
                  const index = newSections.findIndex((s) => s.id === section.id);
                  const qIndex = newSections[index].questions.findIndex((q) => q.id === question.id);
                  newSections[index].questions[qIndex].text = e.target.value;
                  setSections(newSections);

                  // Automatically adjust the height based on content
                    e.target.style.height = 'auto';  // Reset the height to recalculate
                    e.target.style.height = `${e.target.scrollHeight}px`;  // Set height based on scroll height
                }}

                style={{
                    resize: 'none',   // Prevent manual resizing
                    overflow: 'hidden', // Hide scroll bar
                    height: 'auto',   // Let it adjust to content
                  }}
              />

                  {/* Delete Question Button */}
                <button
                className="btn-delete-question"
                onClick={() => {
                    const newSections = [...sections];
                    const index = newSections.findIndex((s) => s.id === section.id);
                    newSections[index].questions = newSections[index].questions.filter(
                    (q) => q.id !== question.id
                    );
                    setSections(newSections);
                }}
                >
                <FaTrashAlt />
                </button>


              <select
                value={question.type}
                onChange={(e) => {
                  const newSections = [...sections];
                  const index = newSections.findIndex((s) => s.id === section.id);
                  const qIndex = newSections[index].questions.findIndex((q) => q.id === question.id);
                  newSections[index].questions[qIndex].type = e.target.value;
                  setSections(newSections);
                }}
              >
                <option value="text">Text</option>
                <option value="multiple">Multiple Choice</option>
              </select>

              {question.type === 'multiple' && (
                <div>
                  {question.options.map((option) => (
                    <div key={option.id} className="option-container">
                      <input
                        type="text"
                        placeholder="Enter answer option"
                        value={option.text}
                        onChange={(e) => {
                          const newSections = [...sections];
                          const index = newSections.findIndex((s) => s.id === section.id);
                          const qIndex = newSections[index].questions.findIndex((q) => q.id === question.id);
                          const oIndex = newSections[index].questions[qIndex].options.findIndex((o) => o.id === option.id);
                          newSections[index].questions[qIndex].options[oIndex].text = e.target.value;
                          setSections(newSections);
                        }}
                      />

                      <input
                        type="number"
                        placeholder="Points"
                        value={option.points}
                        min="0" // Ensures only non-negative points are allowed
                        onChange={(e) => {
                          const newSections = [...sections];
                          const index = newSections.findIndex((s) => s.id === section.id);
                          const qIndex = newSections[index].questions.findIndex((q) => q.id === question.id);
                          const oIndex = newSections[index].questions[qIndex].options.findIndex((o) => o.id === option.id);
                          newSections[index].questions[qIndex].options[oIndex].points = parseInt(e.target.value);
                          setSections(newSections);
                        }}
                      />

                      <select
                        value={option.nextSection || ''}
                        onChange={(e) =>
                          handleNextSectionChange(section.id, question.id, option.id, parseInt(e.target.value))
                        }
                      >
                        <option value="">No Section</option>
                        {sections.map((sec) => (
                          <option key={sec.id} value={sec.id}>
                            Section {sec.id}
                          </option>
                        ))}
                      </select>

                      <textarea
                        placeholder="Enter feedback for this option"
                        value={option.feedback}
                        onChange={(e) => {
                            const newSections = [...sections];
                            const index = newSections.findIndex((s) => s.id === section.id);
                            const qIndex = newSections[index].questions.findIndex((q) => q.id === question.id);
                            const oIndex = newSections[index].questions[qIndex].options.findIndex((o) => o.id === option.id);
                            newSections[index].questions[qIndex].options[oIndex].feedback = e.target.value;
                            setSections(newSections);

                            // Automatically adjust height based on content
                            e.target.style.height = 'auto'; // Reset the height
                            e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on scroll height
                        }}
                        style={{
                            resize: 'none',
                            width: '100%',
                            overflow: 'hidden',
                            height: 'auto', // Adjust dynamically
                            marginTop: '5px'
                        }}
                    />

                      <button
                        className="btn-delete-option"
                        onClick={() => {
                          const newSections = [...sections];
                          const index = newSections.findIndex((s) => s.id === section.id);
                          const qIndex = newSections[index].questions.findIndex((q) => q.id === question.id);
                          newSections[index].questions[qIndex].options = newSections[index].questions[qIndex].options.filter(
                            (o) => o.id !== option.id
                          );
                          setSections(newSections);
                        }}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  ))}

                  <button className="btn-add-option" onClick={() => addOption(section.id, question.id)}>
                    Add Option
                  </button>
                </div>
              )}
            </div>
          ))}
          <button className="btn-add-question" onClick={() => addQuestion(section.id)}>
            Add Question
          </button>
        </div>
      ))}

      <button className="btn-add-section" onClick={addSection}>
        Add New Section
      </button>

       {/* Submit Button */}
      <button className="submit-btn" onClick={submitForm}>Submit</button>
    </div>
  );
};

export default CreateQuiz;