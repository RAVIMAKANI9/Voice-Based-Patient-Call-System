import React, { useState } from 'react';
import './Patients.css';
import PatientNavigation from '../components/PatientNavigation'; 
import { SearchOutlined,CheckCircleFilled } from '@ant-design/icons';

const Patients = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const patients = [
        { id: 101, name: "Sicily", condition: "Stable", nurse: "Helen", requestStatus: "Fulfilled", roomNo: "101A" },
        { id: 102, name: "Bradford", condition: "Critical", nurse: "Eric", requestStatus: "Pending", roomNo: "202B" },
        
    ];

    const filteredPatients = patients.filter(patient =>
        Object.values(patient).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="patients-container">
            <h1>Patient Records</h1>
            <div className="search-bar">
            <SearchOutlined className="search-icon" />
                <input
                    type="text"
                    placeholder="Search for patients"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="patients-list">
                {filteredPatients.map(patient => (
                    <div key={patient.id} className="patient-card">
                        <div className="patient-name">{patient.name}</div>
                        <div className="patient-info">
                            <span>ID: {patient.id}</span>
                            <span>Room: {patient.roomNo}</span>
                        </div>
                        <div className="patient-condition">
                            Condition: {patient.condition}
                            {patient.condition === "Critical" ? <span className="critical-dot"></span> : <span className="stable-dot"></span>}
                        </div>
                        <div className="patient-status">
                            Request Status: {patient.requestStatus}
                            {patient.requestStatus === "Fulfilled" ? (<CheckCircleFilled style={{ color: 'green', fontSize: '1.5em' }} /> 
                                )  : <span className="absent-circle-x"></span>}
                        </div>
                    </div>
                ))}
            </div>
            <PatientNavigation selected="patients" />
        </div>
    );
};

export default Patients;