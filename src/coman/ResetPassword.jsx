import React, { useState } from 'react';
import './ResetPassword.css'; // Import the CSS file

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userName, setUserName] = useState('User'); // Replace with actual user data
  const [companyName] = useState('Your Company'); // Replace with actual company name
  const [showModal, setShowModal] = useState(false); // State to control the popup modal

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error and success messages
    setError('');
    setSuccessMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Simulate an API call to reset the password
    setTimeout(() => {
      if (newPassword && confirmPassword) {
        setSuccessMessage('Your password has been reset successfully.');
        setShowModal(true); // Show the modal on success
      } else {
        setError('Failed to reset password. Please try again.');
      }
    }, 1000);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="email-container">
      <div className="header">
        {/* Replace with your logo */}
        <img src="https://img.freepik.com/free-vector/3d-cartoon-style-paper-with-green-tick-envelope-icon-open-envelope-with-approved-document-contract-agreement-flat-vector-illustration-paperwork-success-verification-concept_778687-1016.jpg?t=st=1732610065~exp=1732613665~hmac=52b95529016f9d61ff87cec727cf1726fda37fe1d44921f582c9aec332813513&w=740" alt="Company Logo" className="logo" />
      </div>

      <h1>Reset Your Password</h1>
      
      <div className="content">
        <p>Hello {userName},</p>
        <p>Please enter your new password below to reset it.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit">RESET PASSWORD</button>
        </form>

        {error && <p className="errorMessage">{error}</p>}
        {successMessage && <p className="successMessage">{successMessage}</p>}
      </div>

      <footer>
        <p>If you did not request this change, please contact our support.</p>
        <p>Thank you for choosing {companyName}.</p>
      </footer>

      {/* Modal Popup for Success Message */}
      {showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      {/* Displaying Video Like a Logo */}
      <video 
        autoPlay 
        loop 
        muted 
        className="modal-video"
      >
        <source src="/src/assets/workDone.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h2>Password Changed Successfully</h2>
      <p className="password-change-message">
        Your password has been updated successfully. You can now log in with your new password.
      </p>
      <button onClick={handleModalClose}>Close</button>
    </div>
  </div>
)}
{showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      {/* Displaying Video Like a Logo */}
      <video 
        autoPlay 
        loop 
        muted 
        className="modal-video"
      >
        <source src="/src/assets/workDone.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h2>Password Changed Successfully</h2>
      <p className="password-change-message">
        Your password has been updated successfully. You can now log in with your new password.
      </p>
      <button onClick={handleModalClose}>Close</button>
    </div>
  </div>
)}
    </div>
  );
};

export default ResetPassword;
