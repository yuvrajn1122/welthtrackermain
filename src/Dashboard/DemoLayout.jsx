import React from "react";
import "./DemoLayout.css"; // Import the CSS file

const DemoLayout = () => {
  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <h1>Website Title</h1>
        <nav>
          <ul className="navList">
            <li className="navItem">
              <a href="/">Home</a>
            </li>
            <li className="navItem">
              <a href="/profile">About</a>
            </li>
            <li className="navItem">
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="main">
        <h2>Welcome to My Website</h2>
        <p>This is the main content area. Customize it as needed!</p>
      </main>

      
    </div>
  );
};

export default DemoLayout;
