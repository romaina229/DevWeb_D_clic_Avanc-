import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="dashboard">
            <nav className="navbar">
                <h1>Dashboard Administrateur</h1>
                <div className="user-info">
                    <span>Connecté en tant que: {user.name}</span>
                    <Logout />
                </div>
            </nav>

            <div className="sidebar">
                <ul>
                    <li><Link to="/dashboard">Tableau de bord</Link></li>
                    <li><Link to="/technicien">Gestion Techniciens</Link></li>
                    <li><Link to="/vehicule">Gestion Véhicules</Link></li>
                    <li><Link to="/clients">Clients</Link></li>
                    <li><Link to="/rapports">Rapports</Link></li>
                </ul>
            </div>

            <div className="content">
                <h2>Bienvenue {user.name} !</h2>
                <p>Rôle: {user.role}</p>
                
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>10</h3>
                        <p>Techniciens actifs</p>
                    </div>
                    <div className="stat-card">
                        <h3>25</h3>
                        <p>Véhicules</p>
                    </div>
                    <div className="stat-card">
                        <h3>42</h3>
                        <p>Interventions ce mois</p>
                    </div>
                </div>
            </div>

            <style>{`
                .dashboard {
                    display: flex;
                    min-height: 100vh;
                }
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: #343a40;
                    color: white;
                    padding: 15px 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 100;
                }
                .user-info {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }
                .sidebar {
                    width: 250px;
                    background: #f8f9fa;
                    padding: 80px 0 20px 0;
                    border-right: 1px solid #dee2e6;
                }
                .sidebar ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .sidebar li {
                    padding: 0;
                }
                .sidebar a {
                    display: block;
                    padding: 15px 25px;
                    color: #333;
                    text-decoration: none;
                    border-left: 4px solid transparent;
                }
                .sidebar a:hover {
                    background: #e9ecef;
                    border-left-color: #007bff;
                }
                .content {
                    flex: 1;
                    padding: 100px 40px 40px 290px;
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-top: 30px;
                }
                .stat-card {
                    background: white;
                    padding: 25px;
                    border-radius: 10px;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                    text-align: center;
                }
                .stat-card h3 {
                    font-size: 36px;
                    margin: 0;
                    color: #007bff;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;