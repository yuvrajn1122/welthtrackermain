import React from 'react';

const ProfileDropdown = () => {
    return (
        <div className="profile-dropdown">
            {/* Dropdown content goes here */}
            <button>Profile</button>
            <button>Support</button>
            <button onClick={handleLogout}>Sign out</button>
        </div>
    );
};

export default ProfileDropdown;
