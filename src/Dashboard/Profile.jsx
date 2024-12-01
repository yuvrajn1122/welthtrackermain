import React, { useState, useEffect } from 'react';
import './profileStyle.css';
import { Outlet } from 'react-router-dom';

const ProfileManager = () => {
    // State to manage the user details, OTP status, and error message
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        emailVerified: false,
        phoneNumberVerified: false,
    });
    const [isVerified, setIsVerified] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [activeTab, setActiveTab] = useState('personalDetails'); // State to manage the active tab

    // New state for change password fields
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Fetch token from cookies
    const getCookie = (cookieName) => {
        let name = cookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookiesArray = decodedCookie.split(';');
        for (let i = 0; i < cookiesArray.length; i++) {
            let cookie = cookiesArray[i].trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return null;
    };

    // Function to fetch user details on component mount
    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = getCookie('token');
            if(token==null){
                window.location.href = "/login";
            }
            
            try {
                const response = await fetch('http://localhost:5001/api/users/details', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserDetails(data.userDetailsResponsel);
                } else {
                    setErrorMessage('Failed to load user details.');
                }
            } catch (error) {
                setErrorMessage(`Error: ${error.message}`);
            }
        };

        fetchUserDetails();
    }, []);

    const handleCheckboxChange = () => {
        setIsVerified(!isVerified);
    };

    const handleSendOtp = async (type) => {
        const body = type === 'email' ? { email: userDetails.email } : { phoneNumber: userDetails.phoneNumber };
        
        try {
            const response = await fetch('http://localhost:5001/api/v1/otp/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                setOtpSent(true);
                setShowOtpPopup(true);
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                setErrorMessage(`Error: ${errorData.message || 'Failed to send OTP'}`);
            }
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
        }
    };

    const handleValidateOtp = async () => {
        const token = getCookie('token');

        try {
            const response = await fetch('http://localhost:5001/api/v1/otp/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ email: userDetails.email, otp }),
            });

            const data = await response.json();

            if (data.responseCode === "008") {
               
                setIsVerified(true);
                setShowOtpPopup(false);
                setOtpSent(false);
                setErrorMessage('');
            } else if (data.responseCode === "009") {
                setErrorMessage('Error: Invalid OTP.');
            } else {
                setErrorMessage(`Error: ${data.responseMessage || 'Unexpected error occurred.'}`);
            }
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
        }
    };

    const handleChangePassword = async () => {
        const token = getCookie('token');
    
        // Check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            setErrorMessage('New password and confirm password do not match.');
            return;
        }
    
        // First, verify the current password
        try {
            const checkResponse = await fetch('http://localhost:5001/api/accountsettings/check-previous-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ currentPassword }),
            });
    
            const checkData = await checkResponse.json();
    
            // Check the response code
            if (checkResponse.ok && checkData.responseCode === "200") {
                // Proceed to change password if current password is correct
                const changeResponse = await fetch('http://localhost:5001/api/accountsettings/change-password', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ 
                        newPassword, 
                        conformPassword: confirmPassword 
                    }),
                });
    
                const changeData = await changeResponse.json();
    
                if (changeResponse.ok && changeData.responseCode === "200") {
                  
                    // Reset fields after successful change
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setErrorMessage('');
                } else {
                    setErrorMessage(`Error: ${changeData.responseMessage || 'Failed to change password.'}`);
                }
            } else {
                // If the response code is not 200, show the corresponding error message
                const errorMessage = checkData.responseMessage || 'An unexpected error occurred.';
                setErrorMessage(`Error: ${errorMessage}. Please enter the correct existing password.`);
            }
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
        }
    };
    

    return (
       
        <div className="account-settings">
             <Outlet />
            <h1>Account Settings</h1>
            <div className="tabs">
                <button 
                    className={`tab ${activeTab === 'personalDetails' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('personalDetails')}
                >
                    Personal Details
                </button>
                <button 
                    className={`tab ${activeTab === 'changePassword' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('changePassword')}
                >
                    Change Password
                </button>
            </div>

            {/* Conditional rendering based on the active tab */}
            {activeTab === 'personalDetails' && (
                <div className="profile-details">
                    <div className="details">
                        <div className="form-group">
                            <label htmlFor="first-name">First Name *</label>
                            <input
                                type="text"
                                id="first-name"
                                value={userDetails.firstName}
                                onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
                            />
                            <label htmlFor="last-name">Last Name *</label>
                            <input
                                type="text"
                                id="last-name"
                                value={userDetails.lastName}
                                onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address *</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="email"
                                    id="email"
                                    value={userDetails.email}
                                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                />
                                {!userDetails.emailVerified ? (
                                    <button
                                        className="otp-button"
                                        onClick={() => handleSendOtp('email')}
                                        style={{ marginLeft: '10px' }}
                                        disabled={false}
                                    >
                                        Send OTP
                                    </button>
                                ) : (
                                    <button
                                        className="otp-button"
                                        style={{ marginLeft: '10px' }}
                                        disabled={true}
                                    >
                                        Send OTP
                                    </button>
                                )}
                            </div>
                            {userDetails.emailVerified === false && (
                                <div className="verification-message" style={{ color: 'red' }}>
                                    Please verify your email.
                                </div>
                            )}
                            {otpSent && (
                                <div className="otp-message">
                                    OTP has been sent to your email address.
                                </div>
                            )}
                            {showOtpPopup && (
    <div className="otp-popup">
        <div className="otp-popup-content">
            <h2>Enter OTP</h2>
            <p>
                A One-Time Password (OTP) has been sent to your{" "}
                {otpSent && userDetails.emailVerified === false ? "email" : "phone number"}.
            </p>
            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP"
                className="otp-input"
            />
            <div className="otp-popup-buttons">
                <button className="validate-button" onClick={handleValidateOtp}>
                    Validate OTP
                </button>
                <button className="close-button" onClick={() => setShowOtpPopup(false)}>
                    Close
                </button>
            </div>
            {errorMessage && (
                <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
                    {errorMessage}
                </div>
            )}
        </div>
    </div>
)}

                        </div>
                        <div className="form-group">
                            <label htmlFor="phone-number">Phone Number *</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    id="phone-number"
                                    value={userDetails.phoneNumber}
                                    onChange={(e) => setUserDetails({ ...userDetails, phoneNumber: e.target.value })}
                                />
                                {!userDetails.phoneNumberVerified ? (
                                    <button
                                        className="otp-button"
                                        onClick={() => handleSendOtp('phone')}
                                        style={{ marginLeft: '10px' }}
                                        disabled={false}
                                    >
                                        Send OTP
                                    </button>
                                ) : (
                                    <button
                                        className="otp-button"
                                        style={{ marginLeft: '10px' }}
                                        disabled={true}
                                    >
                                        Send OTP
                                    </button>
                                )}
                            </div>
                            {userDetails.phoneNumberVerified === false && (
                                <div className="verification-message" style={{ color: 'red' }}>
                                    Please verify your phone number.
                                </div>
                            )}
                        </div>
                        <button 
                            className="save-button" 
                            
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'changePassword' && (
                <div className="change-password">
                    <h2>Change Password</h2>
                    <div className="form-group">
                        <label htmlFor="current-password">Current Password *</label>
                        <input
                            type="password"
                            id="current-password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="new-password">New Password *</label>
                        <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password *</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button className="save-button" onClick={handleChangePassword}>
                        Change Password
                    </button>
                    {errorMessage && (
                        <div className="error-message" style={{ color: 'red' }}>
                            {errorMessage}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileManager;
