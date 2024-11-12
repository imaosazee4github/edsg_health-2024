import React, { useState } from 'react';

const PasscodeInputForm = ({ handleAttempt, attemptCount, maxAttempts, onSuccess }) => {
  const [passcode, setPasscode] = useState('');
  const [message, setMessage] = useState('');

  const verifyPasscode = () => {
    const mockPasscode = '12345'; // Replace this with the actual passcode logic
    return passcode === mockPasscode;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verifyPasscode()) {
      setMessage('Access Granted');
      handleAttempt(true);
      onSuccess(); // Trigger redirection to the form page
    } else {
      setMessage('Incorrect Passcode');
      handleAttempt(false);
    }
  };

  return (
    <div className="passcode-form">
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Enter your passcode"
          disabled={attemptCount >= maxAttempts} // Only disable if attempts reached max
        />
        <button type="submit" disabled={attemptCount >= maxAttempts}>Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PasscodeInputForm;
