import React from 'react';
import { Link } from 'react-router-dom';
import './NurseNavigation.css';
import { HomeOutlined, UnorderedListOutlined, UserAddOutlined } from '@ant-design/icons';

const NurseNavigation = ({ selected }) => {
    return (
        <nav className="nurse-nav">
            <Link to="/dashboard" className={selected === "dashboard" ? "active" : ""}>
            <HomeOutlined/>Home</Link>
            <Link to="/nurses/new" className={selected === "new" ? "active" : ""}>
            <UserAddOutlined />New Registrationn</Link>
            <Link to="/nurses/records" className={selected === "records" ? "active" : ""}>
            <UnorderedListOutlined />Detailed Records</Link>
        </nav>
    );
};

export default NurseNavigation;