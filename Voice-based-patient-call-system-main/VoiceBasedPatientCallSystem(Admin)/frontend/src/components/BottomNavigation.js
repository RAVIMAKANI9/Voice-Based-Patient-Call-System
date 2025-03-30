import React from 'react';
import { Link } from 'react-router-dom';
import './BottomNavigation.css';
import { LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'; 

const BottomNavigation = () => {
    return (
        <nav className="dashboard-nav">
            <Link to="/logout" className="nav-item">
                <LogoutOutlined />
                Logout
            </Link>
            <Link to="/nurses" className="nav-item">
                <TeamOutlined />
                Nurses
            </Link>
            <Link to="/patients" className="nav-item">
                <UserOutlined />
                Patients
            </Link>
        </nav>
    );
};

export default BottomNavigation;
