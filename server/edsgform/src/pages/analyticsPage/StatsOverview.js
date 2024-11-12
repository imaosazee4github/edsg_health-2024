import React from 'react';
import './StatsOverview.css';

const StatsOverview = () => {
  return (
    <div className="stats-overview">
      <h2>Overview</h2>
      <div className="stat-card">Total Forms Submitted: 0</div>
      <div className="stat-card">Completion Rate: 0%</div>
      <div className="stat-card">Average Completion Time: 0 min</div>
    </div>
  );
};

export default StatsOverview;
