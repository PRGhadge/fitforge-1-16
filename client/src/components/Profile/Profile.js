import React, { useState, useEffect } from 'react';
import './Profile.css';
import profileImage from './proimg.jpg';
import LogoutConfirmationDialog from './LogoutConfirmationDialog';
import { Link } from 'react-router-dom';

const Profile = ({clientId}) => {
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [error, setError] = useState(null);

  const fetchClientData = async (client_id) => {
    try {
      // Make sure you are using the correct base URL if you haven't configured a proxy.
      // If you're using a proxy, the following fetch call is correct.
      const response = await fetch(`http://localhost:5000/client/${client_id}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(data)
      setClientData(data); // Assuming the response has the data in the correct format
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to load client data');
    }
  };


  useEffect(() => {
    fetchClientData('1');
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirmation(false);
    // Here you would handle the actual logout process
  };

  function calculateAge(dob) {
    const birthday = new Date(dob);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  return (
    <div className="profile-container">
      {/* Render error message if there is an error */}
      {error && <div className="error-message">{error}</div>}

      {/* Render profile details only if there is no error and clientData is available */}
      {!error && clientData && (
        <>
          <div className="profile-header">
            <div className="profile-picture-container">
              <img src={profileImage} alt="User" className="profile-photo" />
            </div>
            <h2 className="profile-name">{clientData.fname} {clientData.lname}</h2>
          </div>
          <div className="profile-details">
            <div className="detail-box">
              <p className="detail-label">Height</p>
              <p className="detail-value">{clientData.height} cm</p>
            </div>
            <div className="detail-box">
              <p className="detail-label">Age</p>
              {/* Make sure you calculate the age from dob */}
              <p className="detail-value">{calculateAge(clientData.dob)}</p>
            </div>
            <div className="detail-box">
              <p className="detail-label">Weight</p>
              <p className="detail-value">{clientData.weight} lb</p>
            </div>
          </div>
          <button className="edit-button">Edit Profile</button>
            <div className="menu-container">
            <Link to={`/trainer-profile/${clientData.trainer_id}`} className="menu-button" style={{ textDecoration: 'none' }}>
                My Trainer <span className="menu-arrow">{' >'}</span>
            </Link>
            <button className="menu-button" onClick={handleLogoutClick}>
                Logout <span className="menu-arrow">{' >'}</span>
            </button>
            </div>
        </>
      )}

      {showLogoutConfirmation && (
        <LogoutConfirmationDialog onClose={handleCancelLogout} onConfirm={handleConfirmLogout} />
      )}
    </div>
  );
};

export default Profile;