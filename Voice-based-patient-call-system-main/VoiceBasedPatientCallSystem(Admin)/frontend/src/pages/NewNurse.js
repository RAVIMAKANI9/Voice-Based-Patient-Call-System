import React, {useState} from 'react';
import './NewNurse.css';
import NurseNavigation from '../components/NurseNavigation';

const NewNurse = () =>  {
    const [alertMessage, setAlertMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); 
        setAlertMessage('Profile saved successfully!');
        setTimeout(() => {
            setAlertMessage('');
        }, 3000);
    };
    return (
        <div className="registration-container">
            <div className="registration-header">
                <h1>Employee / Nurse Sign Up</h1>
            </div>
            <form className="registration-form" onSubmit={handleSubmit}>
                <h3>Registration Form</h3>
                <div className="form-group">
                    <input type="text" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Enter your department name" />
                </div>
                <div className="form-group">
                    <select>
                        <option value="">Select your role</option>
                        <option value="Registered Nurse">Registered Nurse</option>
                        <option value="Medical Assistant">Medical Assistant</option>
                        <option value="Ward Staff">Ward Staff</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Enter your contact number" />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Enter your license number" />
                </div>
                <button className="submit-button">Submit</button>
                </form>
                {alertMessage && <div className="alert-message">{alertMessage}</div>} 
            <NurseNavigation selected="nurses" />
            </div>
            
        
    );
};

export default NewNurse;