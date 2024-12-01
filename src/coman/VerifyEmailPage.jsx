import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import './VerifyEmailPage.css'; // Assuming you save the CSS in a file named `VerifyEmailPage.css`

const VerifyEmailPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verified, setVerified] = useState(false);
  const [fullName, setFullName] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      const requestPayload = { token };

      axios
        .post('http://localhost:5001/api/users/verifyEmail', requestPayload)
        .then((response) => {
          if (response.data.responseCode === '200') {
            setVerified(true);
            const userDetails = response.data.userDetailsResponsel;

            setFullName(userDetails.fullName);
            setEmailVerified(userDetails.emailVerified);
          } else {
            setError('Invalid or expired token');
          }
        })
        .catch(() => {
          setError('An error occurred while verifying the token.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError('No token found in the URL.');
      setLoading(false);
    }
  }, []);

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the login page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="container">
        <div className="header">
          <img
            src="https://img.freepik.com/free-vector/3d-cartoon-style-paper-with-green-tick-envelope-icon-open-envelope-with-approved-document-contract-agreement-flat-vector-illustration-paperwork-success-verification-concept_778687-1016.jpg?t=st=1732610065~exp=1732613665~hmac=52b95529016f9d61ff87cec727cf1726fda37fe1d44921f582c9aec332813513&w=740"
            alt="Company Logo"
          />
        </div>

        <h1>Account Activated</h1>

        <div className="content">
          <p>Hey {fullName},</p>
          <p>Thank you! Your email has been verified, and your account is now active.</p>
          <p>Please use the button below to log in to your account.</p>
          <div className="login-section">
            <button className="button" onClick={handleLoginRedirect}>
              LOGIN TO YOUR ACCOUNT
            </button>
          </div>
        </div>

        <div className="footer">
          <p>Thank you for choosing our service. We can’t wait for you to explore all the features!</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
