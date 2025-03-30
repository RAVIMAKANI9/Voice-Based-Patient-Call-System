import React from 'react';
import './HomeScreen.css'; 
import { useNavigate } from 'react-router-dom';

function HomeScreen() {
    const navigate = useNavigate(); 

    const handleLoginClick = () => {
     navigate('/login');
    };
    const handleExitClick = () => {
        window.location.href = 'about:blank';
    };
    return (
      <div className="fullscreen-container"> 
        <div className="logo">
          <img src="/medlog.jpg" alt="Logo" /> 
        </div>
        <h1 className="app-name">Vocal Care</h1>
        <p className="app-description">
          Your health, our mission— delivering care, one message at a time.
        </p>
        <div className="button-group">
          <button className="dashboard-button" onClick={handleLoginClick}>Login</button>
          <button className="dashboard-button"onClick={handleExitClick}>Exit</button>

        </div>
      </div>
    );
  }
  
  export default HomeScreen;