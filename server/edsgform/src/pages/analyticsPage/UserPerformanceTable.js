import React from 'react';
import './UserPerformanceTable.css';

const UserPerformanceTable = () => {
  return (
    <div className="user-performance-table">
      <h2>User Performance</h2>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Completion Time</th>
            <th>Path Taken</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sample User 1</td>
            <td>10 min</td>
            <td>Path A-B-C</td>
          </tr>
          <tr>
            <td>Sample User 2</td>
            <td>8 min</td>
            <td>Path A-C-D</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserPerformanceTable;
