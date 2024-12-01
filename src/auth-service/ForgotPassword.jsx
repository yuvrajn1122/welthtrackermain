import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./ForgotPassword.css"; // Include this stylesheet for styling.

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // To manage loading state
  const [errorMessage, setErrorMessage] = useState(""); // To manage error state
  const [showPopup, setShowPopup] = useState(false); // To manage pop-up visibility
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = async () => {
    setLoading(true); // Start loading
    setErrorMessage(""); // Clear any previous error
    setShowPopup(false); // Hide pop-up initially

    try {
      const response = await fetch("http://localhost:5001/api/users/sendverifyEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, typeValidation: "forgotPassword" }),
      });

      const data = await response.json();

      if (response.ok && data.responseCode === "200") {
        navigate("/SuccessMessage"); // Redirect to SuccessMessage page
      } else {
        setErrorMessage(data.responseMessage || "Something went wrong. Please try again.");
        setShowPopup(true); // Show pop-up for error message
      }
    } catch (error) {
      setErrorMessage("Failed to send the verification link. Please try again later.");
      setShowPopup(true); // Show pop-up for error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the pop-up
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="modal-video2">
          <video autoPlay loop muted className="modal-video1">
            <source src="src/assets/forgotPasswordvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <h1>Forgot password?</h1>
        <p>Please enter your email address</p>
        <div>
          <label htmlFor="email" className="form-label">
            Email address<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Please enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button
          className="submit-button"
          onClick={handleClick}
          disabled={!email || loading} // Disable button if email is empty or loading
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <p>
          Don’t you have an account?{" "}
          <a href="/register" className="signup-link">
            Sign up
          </a>
        </p>
      </div>

      {/* Pop-up modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>{errorMessage}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
