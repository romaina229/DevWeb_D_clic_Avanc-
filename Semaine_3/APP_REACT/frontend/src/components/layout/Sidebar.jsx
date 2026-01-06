import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();

    const navItems = [
        { path: '/dashboard', label: 'Tableau de bord', icon: '📊' },
        { path: '/techniciens', label: 'Techniciens', icon: '👨‍🔧' },
        { path: '/vehicules', label: 'Véhicules', icon: '🚗' },
        { path: '/reparations', label: 'Réparations', icon: '🔧' },
        { path: '/technicien-reparations', label: 'Affectations', icon: '📝' },
    ];

    return (
        <div className="sidebar" style={{ width: '250px' }}>
            <div className="p-3">
                <h5>Navigation</h5>
            </div>
            <Nav className="flex-column">
                {navItems.map(item => (
                    <Nav.Item key={item.path}>
                        <Nav.Link 
                            as={Link} 
                            to={item.path}
                            className={`d-flex align-items-center py-3 px-4 ${
                                location.pathname === item.path ? 'bg-primary text-white' : ''
                            }`}
                        >
                            <span className="me-3">{item.icon}</span>
                            {item.label}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    );
}

export default Sidebar;