import React, { useState } from 'react';
import './NewPatient.css';
import PatientNavigation from '../components/PatientNavigation';

const NewPatient = () => {
    const [alertMessage, setAlertMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setAlertMessage('Details saved successfully!');
        setTimeout(() => setAlertMessage(''), 3000);
    };

    return (
        <div className="registration-container">
            <div className="registration-header">
                <h1>Patient Sign Up</h1>
            </div>
            <form className="registration-form" onSubmit={handleSubmit}>
                <h3>Patient Registration Form</h3>
                {/* <p>Please provide the following information to create your account.</p> */}
                <div className="form-group">
                    <input type="text" placeholder="First Name" />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Last Name" />
                </div>
                <div className="form-group">
                    <input type="date" /> 
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Contact Number" />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" />
                </div>
                <div className="form-group">
                    <select>
                        <option value="">Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <textarea placeholder="Medical History (Are previous or existing medical conditions we should be aware of? (e.g. diabetes, heart disease))"></textarea>
                </div>
                <div className="form-group checkbox-group">
                    <input type="checkbox" id="agree" />
                    <label htmlFor="agree">
                        I agree to receive communications from VocalCare and be contacted via email or SMS for appointment reminders and health updates.
                    </label>
                </div>
                <button className="submit-button" type="submit">Submit</button>
            </form>
            {alertMessage && <div className="alert-message">{alertMessage}</div>}
            <PatientNavigation selected="patients" />
        </div>
    );
};

export default NewPatient;