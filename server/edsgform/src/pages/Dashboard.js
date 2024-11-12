import React from 'react';
import './Dashboard.css';
import Header from '../components/Header';
import { FaUser, FaTasks, FaFileAlt, FaCogs, FaChartLine, FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {
    // Mock user data for demonstration
    const user = { name: "Admin" }; // Replace with actual user data if needed

    const handleLogout = async () => {
        // Handle logout logic here
        console.log("User logged out");
    };

    return (
        <>
            <Header />
            <div className="dashboard-container">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="sidebar-header">
                        <h2 className="sidebar-title">EDSG Admin</h2>
                    </div>
                    <nav className="sidebar-nav">
                        <ul>
                            <li><FaChartLine /> Dashboard Overview</li>
                            <li><FaTasks /> Manage Evaluations</li>
                            <li><FaFileAlt /> View Submissions</li>
                            <li><FaCogs /> Settings</li>
                            <li><FaUser /> Profile</li>
                        </ul>
                    </nav>
                    <div className="sidebar-footer">
                        <button className="logout-button" onClick={handleLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </aside>

                {/* Main Dashboard Content */}
                <main className="main-content">
                    <header className="dashboard-header">
                        <h1>Welcome, {user ? user.name : "Admin"}!</h1>
                        <p>Overview of your form creation, evaluations, and statistics.</p>
                    </header>

                    <div className="stats-cards">
                        <div className="card">
                            <h3>Total Evaluations</h3>
                            <p>15</p>
                        </div>
                        <div className="card">
                            <h3>New Evaluations</h3>
                            <p>32</p>
                        </div>
                        <div className="card">
                            <h3>Average Score</h3>
                            <p>78%</p>
                        </div>
                        <div className="card">
                            <h3>Centres Evaluated</h3>
                            <p>150</p>
                        </div>
                    </div>

                    <div className="charts">
                        <div className="chart">
                            <h3>Evaluation Trends</h3>
                            {/* Add chart component or data visualization for submissions */}
                        </div>
                        <div className="chart">
                            <h3>Top-Performing Personnel</h3>
                            {/* Add chart component or data visualization for performance */}
                        </div>
                    </div>

                    <div className="latest-projects">
                        <h3>Recent Evaluations</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Form Name</th>
                                    <th>Submitted By</th>
                                    <th>Score</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Health Facility Evaluation</td>
                                    <td>John Doe</td>
                                    <td>88%</td>
                                    <td>10-07-2024</td>
                                </tr>
                                <tr>
                                    <td>Employee Training Quiz</td>
                                    <td>Jane Smith</td>
                                    <td>95%</td>
                                    <td>10-06-2024</td>
                                </tr>
                                {/* Additional rows for more submissions */}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Dashboard;

