import React, { useState } from 'react';
import './Nurses.css';
import NurseNavigation from '../components/NurseNavigation';
import { SearchOutlined , CheckCircleFilled} from '@ant-design/icons'; 


const Nurses = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const nurses = [
        { id: 1, name: "Helen", department: "ER", status: "Active", pendingRequests: 0 },
        { id: 2, name: "Eric", department: "ICU", status: "Absent", pendingRequests: 2 },
    ];

    const filteredNurses = nurses.filter(nurse =>
        Object.values(nurse).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="nurses-container">
            <h1>Nurse Records</h1>
            <div className="search-bar">
            <SearchOutlined className="search-icon" />
                <input
                    type="text"
                    placeholder="Search for nurses"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="nurses-list">
                {filteredNurses.map(nurse => (
                    <div key={nurse.id} className="nurse-card">
                        <div className="nurse-name">{nurse.name}</div>
                        <div className="nurse-info">
                            <span>ID: {nurse.id}</span>
                            <span>Department: {nurse.department}</span>
                        </div>
                        <div className="nurse-status">
                            Availability Status: {nurse.status}
                            {nurse.status === "Active" ? (
        <CheckCircleFilled style={{ color: 'green', fontSize: '1.5em' }} /> 
    )  : <span className="absent-circle-x"></span>}
                        </div>
                        <div className="nurse-requests">
                            Pending Requests: {nurse.pendingRequests}
                            {nurse.pendingRequests === 0 ? <span className="active-dot"></span> : <span className="critical-dot"></span>}
                        </div>
                    </div>
                ))}
            </div>
            <NurseNavigation selected="nurses" />
        </div>
    );
};

export default Nurses;