import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasscodeInputForm from './PasscodeInputForm';
import AttemptCounter from './AttemptCounter';
import './PasscodeAccessPage.css';

const PasscodeAccessPage = () => {
  const [attemptCount, setAttemptCount] = useState(0);
  const maxAttempts = 10;
  const navigate = useNavigate();

  const handleAttempt = (isSuccessful) => {
    if (!isSuccessful) {
      setAttemptCount(attemptCount + 1);
    }
  };

  return (
    <div className="passcode-access-page">
      <h1>Enter Your Passcode</h1>
      <PasscodeInputForm 
        handleAttempt={handleAttempt} 
        attemptCount={attemptCount} // Pass current attempt count
        maxAttempts={maxAttempts} 
        onSuccess={() => navigate('/form')} 
      />
      <AttemptCounter attemptCount={attemptCount} maxAttempts={maxAttempts} />
      {attemptCount >= maxAttempts && <p className="lockout-message">Access Locked. Too many failed attempts.</p>}
    </div>
  );
};

export default PasscodeAccessPage;
