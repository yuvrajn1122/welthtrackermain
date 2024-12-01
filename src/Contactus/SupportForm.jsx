import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./SupportForm.css";
import { encrypt, decrypt } from "../auth-service/EncryptionUtility.jsx";

const SupportForm = () => {
  const [errors, setErrors] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false); // Popup visibility state
  const navigate = useNavigate(); // Initialize navigate

  const handleRedirect = () => {
    setPopupVisible(false); // Close the popup
    navigate("/login"); // Redirect to login
  };

  const validateForm = async (e) => {
    e.preventDefault();
    const fullName = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const description = e.target.message.value.trim();
    let validationErrors = [];

    // Name validation
    if (!/^[A-Za-z\s]{3,}$/.test(fullName)) {
      validationErrors.push("Name must be at least 3 characters long and contain only letters and spaces.");
    }

    // Email validation
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      validationErrors.push("Please enter a valid email address.");
    }

    // Message validation
    if (description.length < 10) {
      validationErrors.push("Message must be at least 10 characters long.");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors([]);
      try {
        // Encrypt the message before submitting
        const encryptedMessage = await encrypt(JSON.stringify({ fullName, email, description }));
        console.log("Encrypted Message:", encryptedMessage);

        // Dynamic backend URL
        const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5002";
        const endpoint = `${backendUrl}/api/v1/contactus/saveContactDetails`;

        // Make the POST request
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: encryptedMessage,
        });

        if (response.ok) {
          const encryptedResponse = await response.text();

          // Decrypt the response
          const decryptedResponse = await decrypt(encryptedResponse);
          const data = JSON.parse(decryptedResponse);

          console.log("Decrypted Response:", data); // Debugging log
          setPopupVisible(true); // Show popup
          e.target.reset(); // Reset form fields
        } else {
          const errorText = await response.text();
          console.error("Response Error:", response.status, errorText);
          setErrors(["Failed to submit the form. Please try again later."]);
        }
      } catch (error) {
        console.error("Connection Error:", error);
        setErrors(["An error occurred. Please check your connection and try again."]);
      }
    }
  };

  return (
    <div className="page-header">
      <div className="company-name-logo">
        <div className="company-name-logo2">
          <img src="/src/assets/welthTrackerFinalLogo.svg" alt="Logo" />
        </div>
        <h1 className="header-text">Wealth Tracker</h1>
      </div>

      <div className="support-container">
        <div className="support-info">
          <div className="logo">
            <img src="/src/assets/welthTrackerFinalLogo.svg" alt="Logo" />
          </div>
          <h1>We're here to support</h1>
          <p>
            Welcome to Wealth Tracker! Your go-to platform for managing your finances effectively.
          </p>
        </div>

        <div className="support-form">
          <h4>Contact Us</h4>

          <form id="contactForm" onSubmit={validateForm}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your Name"
              required
              pattern="[A-Za-z\s]{3,}"
              title="Name must be at least 3 characters long and contain only letters and spaces."
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter a valid email address"
              required
              title="Please enter a valid email address."
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              rows="5"
              required
              minLength="10"
              title="Message must be at least 10 characters long."
            ></textarea>

            <button className="submit-button" type="submit">
              SUBMIT
            </button>

            {errors.length > 0 && (
              <div id="error-message" className="error-message">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Popup */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Thank you for reaching out! Your details have been successfully submitted. Our team will review your query and get back to you shortly.</p>
            <button onClick={handleRedirect}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportForm;
