import React from 'react';
import { Link } from 'react-router-dom';
import './PatientNavigation.css';
import { HomeOutlined, UnorderedListOutlined, UserAddOutlined } from '@ant-design/icons';

const PatientNavigation = ({ selected }) => {
    return (
        <nav className="patient-nav">
            <Link to="/dashboard" className={selected === "dashboard" ? "active" : ""}>
            <HomeOutlined/>Home</Link>
            <Link to="/patients/new" className={selected === "new" ? "active" : ""}>
            <UserAddOutlined />New Registration</Link>
            <Link to="/patients/records" className={selected === "records" ? "active" : ""}>
            <UnorderedListOutlined />Detailed Records</Link>
        </nav>
    );
};

export default PatientNavigation;