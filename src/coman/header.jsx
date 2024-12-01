import React from 'react';
import './dashboardStyle.css';

const Header = () => {
    const goToUrl = (url) => {
        window.location.href = url; // Navigate to the specified URL
    };

    return (
        <header className="top-menu">
            <div className="menu-items">
                <button onClick={() => goToUrl('/profile')}>Profile</button>
                <button onClick={() => goToUrl('/login')}>Logout</button>
               
            </div>
            {/* Iframe to load the URL */}
            <iframe
                src="http://localhost:3000/addCustomer"
                title="Add Customer"
                style={{ width: '100%', height: '500px', border: 'none' }}
            />
        </header>
    );
};

export default Header;
