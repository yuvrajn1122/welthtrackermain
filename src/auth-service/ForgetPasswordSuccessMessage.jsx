import { useNavigate } from "react-router-dom";
import React from "react";
import "./SuccessMessage.css";

const ForgetPasswordSuccessMessage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/login");
  };

  return (
    <div className="success-message-container">
      <div className="success-message-card">
      <div className="modal-video2">
          <video autoPlay loop muted className="modal-video1">
            <source src="src/assets/forgotPasswordvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          </div>
        <h1>Forgot password?</h1>
        <img
          src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
          alt="Checkmark Icon"
          className="icon checkmark-icon"
        />
        <h2>Success!</h2>
        <p>Email sent to your registered email address.</p>
        <button onClick={handleContinue} className="continue-button">
          Continue
        </button>
        <p>
          Don’t have an account?{" "}
          <a href="/register" className="signup-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgetPasswordSuccessMessage;
