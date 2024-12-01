import React, { useState } from 'react';
import './RegisterStyle.css';

function Register() {
  const [showPopup, setShowPopup] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');  // State for contact number

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showReferralSuccessPopup, setShowReferralSuccessPopup] = useState(false);
  const [error, setError] = useState({
    fullname: '',
    email: '',
    password: '',
    contactNumber: '',  // Error state for contact number
  });
  const [referralError, setReferralError] = useState('');

  const BASE_URL = 'http://localhost:5001/api/users/register/user'; // Base URL for the API endpoint

  const handleCheckboxChange = () => {
    setReferralCode('');
    setShowPopup(true);
  };
  const redirectToLogin = () => {
    window.location.href = "/Login";
};

  const handleClosePopup = () => {
    setReferralCode('');
    setShowPopup(false);
    setReferralError('');
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    setShowReferralSuccessPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError({
      fullname: '',
      email: '',
      password: '',
      contactNumber: '', // Reset contact number error
    });

    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const contactRegex = /^\+?[1-9]\d{1,14}$/;  // Contact number validation regex

    // Updated full name regex to allow spaces, apostrophes, and hyphens in names
    const nameRegex = /^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)*$/;

    if (!fullname || !nameRegex.test(fullname)) {
      setError((prev) => ({ ...prev, fullname: 'Please enter a valid Name.' }));
      return;
    }

    if (!email || !emailRegex.test(email)) {
      setError((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
      return;
    }

    if (!password || !passwordRegex.test(password)) {
      setError((prev) => ({ ...prev, password: 'Password must be at least 8 characters long and contain letters, numbers, and special characters.' }));
      return;
    }

    if (!contactNumber || !contactRegex.test(contactNumber)) {
      setError((prev) => ({ ...prev, contactNumber: 'Please enter a valid contact number.' }));
      return;
    }

    const userPayload = {
      fullname,
      email,
      password,
      contactNumber, // Include contact number in payload
      referralCode: referralCode || undefined, // Include referral code if available, otherwise skip it
    };

    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userPayload),
      });

      const result = await response.json();
      if (response.ok) {
        setShowSuccessPopup(true);
        resetForm();
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setFullname('');
    setEmail('');
    setPassword('');
    setContactNumber(''); // Reset contact number
    setReferralCode('');
  };

  const handleReferralCodeSubmit = (e) => {
    e.preventDefault();

    const referralCodeRegex = /^D00[A-Z0-9]{5}$/;

    if (!referralCode.trim()) {
      setReferralError('Referral code is required.');
      return;
    }

    if (!referralCodeRegex.test(referralCode)) {
      setReferralError('Referral Code must be 8 characters long, alphanumeric, and start with "D00".');
      return;
    }

    console.log('Referral code submitted:', referralCode);
    setShowPopup(false);
    setReferralCode('');
    setShowReferralSuccessPopup(true);
  };

  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <img src="/src/assets/welthTrackerFinalLogo.svg" alt="Logo" />
          <h1>Wealth Tracker</h1>
        </div>
      </header>

      {/* Main Container */}
      <div className="containernew">
        <div className="card">
          <div className="row">
            {/* Form Section */}
            <div className="col">
              <h2 className="title">Sign Up</h2>
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fullname" className="label">Full Name</label>
                  <input
                    type="text"
                    id="fullname"
                    className="input"
                    placeholder="Enter your name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)} // This will allow the user to type
                  />
                  {error.fullname && <p className="error-message">{error.fullname}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error.email && <p className="error-message">{error.email}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  {error.password && <p className="error-message">{error.password}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-number" className="label">Contact Number</label>
                  <input
                    type="tel"
                    id="contact-number"
                    className="input"
                    placeholder="Enter your contact number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    pattern="^\+?[1-9]\d{1,14}$"  // Simple pattern for international phone numbers
                    required
                  />
                  {error.contactNumber && <p className="error-message">{error.contactNumber}</p>}
                </div>

                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="subscribe"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="subscribe" className="checkbox-label">Add Referral Code</label>
                </div>
                <button type="submit" className="buttonregister">Register</button>
                <a href="/login" onClick={redirectToLogin} className="login-redirect">Login</a>
              </form>
            </div>

            {/* Image Section */}
            <div className="col image-container">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                alt="Registration illustration"
                className="image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Referral Code Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-logo">
              <img src="/src/assets/welthTrackerFinalLogo.svg" alt="Logo" />
              <h1>Wealth Tracker</h1>
            </div>
            <h2>Add Referral Code</h2>
            <form onSubmit={handleReferralCodeSubmit}>
              <div className="form-group">
                <label htmlFor="referralCode" className="popup-text">Referral Code:</label>
                <input
                  type="text"
                  id="referralCode"
                  value={referralCode}
                  onChange={(e) => {
                    setReferralCode(e.target.value);
                    setReferralError('');
                  }}
                  className="input"
                  placeholder="Enter Referral Code"
                  required
                />
                {referralError && <p className="error-message">{referralError}</p>}
              </div>
              <div className="popup-buttons">
                <button type="submit" className="btn">Add</button>
                <button type="button" className="btn" onClick={handleClosePopup}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Popups */}
      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2 className="success-message">Registration Successful!</h2>
            <div className="popup-buttons">
              <button onClick={handleCloseSuccessPopup} className="btn">Close</button>
            </div>
          </div>
        </div>
      )}

      {showReferralSuccessPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2 className="success-message">Referral Code Added Successfully!</h2>
            <div className="popup-buttons">
              <button onClick={handleCloseSuccessPopup} className="btn">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
