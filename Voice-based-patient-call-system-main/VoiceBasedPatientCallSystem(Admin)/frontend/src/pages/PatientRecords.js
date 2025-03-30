import React from 'react';
import './PatientRecords.css';
import PatientNavigation from '../components/PatientNavigation';
import { FaUserCircle } from 'react-icons/fa'; 
import { BsArrowRightShort } from 'react-icons/bs';

const PatientRecords = () => {
    return (
        <div className="records-container">
            <div className="records-header">
                <h1>Records Management</h1>

            </div>
            <div className="patient-info">
                <div className="profile-icon">
                    <FaUserCircle size={60} /> 
                </div>
                <div className="patient-details">
                    <div className="patient-name">BRADFORD</div>
                    <div className="patient-id">Patient ID: 102</div>
                    <div className="patient-dob">DOB: 07/10/1988 | Sex: M</div>
                </div>
            </div>
            <div className="nurse-interaction">
                <h3>NURSE INTERACTION</h3>
                <div className="interaction-item">
                    <span>12/03/2023</span>
                    <BsArrowRightShort className="arrow-icon" />
                    <span>Nurse JESSICA DANIEL</span>
                    <div className="interaction-details">Washed hands before meal</div>
                </div>
                <div className="interaction-item">
                    <span>04/03/2025</span>
                    <BsArrowRightShort className="arrow-icon" />
                    <span>Nurse Helen S</span>
                    <div className="interaction-details">Observed feeding after surgery</div>
                </div>
            </div>
            <div className="nurse-id">
                <h3>NURSE ID</h3>
                <div className="id-buttons">
                    <button>59</button>
                    <button>48</button>
                    <button>21</button>
                    <button>36</button>
                </div>
            </div>
            <PatientNavigation selected="patients" />
        </div>
    );
};

export default PatientRecords;