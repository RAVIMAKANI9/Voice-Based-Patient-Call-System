
import React, { useState } from 'react';
import './NurseRecords.css';
import NurseNavigation from '../components/NurseNavigation';
import { FaUserNurse, FaPhoneAlt, FaCalendarAlt } from 'react-icons/fa'; // Import nurse icon

const NurseRecords = () => {
    const [showSchedule, setShowSchedule] = useState(false);
    const [showContact, setShowContact] = useState(false);

    const scheduleData = [
        { id: 1, time: '10:00 AM - 01:00 AM', room: '1st Floor' },
        { id: 2, time: '02:00 PM - 05:00 PM', room: '3rd Floor' },
    ];

    const contactData = {
        contact: '7902-4635-08',
        license: '281909',
    };

    return (
        <div className="records-container">
            <div className="records-header">
                <h1>Records Management</h1>
            </div>
            <div className="nurse-info">
                <div className="nurse-icon">
                    <FaUserNurse size={80} />
                </div>
                <div className="nurse-details">
                    <div className="nurse-name">Jenna Lim</div>
                    <div>License No: {contactData.license}</div>
                    <div>Registered Nurse</div>
                    <div>Pediatrics</div>
                </div>
            </div>
            <div className="checkbox-options">
                <label>
                    <input type="checkbox" checked={showSchedule} onChange={() => setShowSchedule(!showSchedule)} />
                    Schedule
                </label>
                <label>
                    <input type="checkbox" checked={showContact} onChange={() => setShowContact(!showContact)} />
                    Contact Information
                </label>
            </div>
            {showSchedule && (
                <div className="schedule">
                    <h3><FaCalendarAlt className="icon" /> Schedule</h3>
                    {scheduleData.map((item, index) => (
                        <div key={index} className="schedule-item">
                            {item.time} | {item.room}
                        </div>
                    ))}
                </div>
            )}
            {showContact && (
                <div className="contact-info">
                    <h3><FaPhoneAlt className="icon" /> Contact Information</h3>
                    <div className="contact-item">Contact: {contactData.contact}</div>
                </div>
            )}
            <NurseNavigation selected="nurses" />
        </div>
    );
};

export default NurseRecords;