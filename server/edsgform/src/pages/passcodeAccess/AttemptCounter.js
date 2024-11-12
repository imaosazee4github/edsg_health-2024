import React from 'react';

const AttemptCounter = ({ attemptCount, maxAttempts }) => {
  return (
    <div className="attempt-counter">
      <p>Attempt {attemptCount} of {maxAttempts}</p>
      {attemptCount >= maxAttempts - 3 && attemptCount < maxAttempts && (
        <p className="warning">You are nearing the maximum attempt limit.</p>
      )}
    </div>
  );
};

export default AttemptCounter;
