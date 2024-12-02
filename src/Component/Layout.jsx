import React, { useState } from "react";
import './layout.css'; // Ensure to style the layout as per your CSS requirements
import { Link, Outlet } from 'react-router-dom';



const Layout = () => {
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [isAddClientOpen, setIsAddClientOpen] = useState(false);
    const [isExpenseMenuOpen, setIsExpenseMenuOpen] = useState(false);
    const [isAccountSettinsOpen, setIsAccountSettinsOpen] = useState(false);
    const toggleDashboardMenu = () => {
        setIsDashboardOpen(!isDashboardOpen);
    };
    const toggAccountSettingsMenu = () => {
        setIsAccountSettinsOpen(!isAccountSettinsOpen);
    };
    const toggleAddClientMenu = () => {
        setIsAddClientOpen(!isAddClientOpen);
    };
    const toggleExpenseMenu = () => {
        setIsExpenseMenuOpen(!isExpenseMenuOpen);
    };

    const goToProfile = () => {
        // Change to use Link for navigation
        window.location.href = "/profile"; // Change this to Link in the next implementation
    };

    const handleLogout = () => {
        // Clear token from cookies
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

        // Redirect to login page
        window.location.href = "/login";
    };



    return (
        <div className="layout-container">

            {/* Sidebar for navigation */}
            <nav className="sidebar">
                <div className="logo-dashbord">
                    <img src="/src/assets/welthTrackerFinalLogo.svg" alt="Logo-dashbord-image" />
                </div>
                <h2 className="sidebar-header">Menu</h2>
                <ul>
                    <li>
                        <a href="#!" onClick={toggleDashboardMenu}>
                            Dashboard {isDashboardOpen}
                        </a>
                        {isDashboardOpen && (
                            <ul className="submenu">
                                <li><Link to="/dashboard">Analytics</Link></li>
                                <li><Link to="/ewallet">E Wallet</Link></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <a href="#!" onClick={toggleAddClientMenu}>
                            Add Client {isAddClientOpen}
                        </a>
                        {isAddClientOpen && (
                            <ul className="submenu">
                                <li><Link to="/addCustomer">Add customer</Link></li>
                                <li><Link to="/customerList">Customer Details</Link></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <a href="#!" onClick={toggleExpenseMenu}>
                            Manage Expense {isExpenseMenuOpen}
                        </a>
                        {isExpenseMenuOpen && (
                            <ul className="submenu">
                                <li>
                                    <Link to="/expenseType">Expense Type</Link>
                                </li>
                                <li>
                                    <Link to="/addExpense">Add Expense</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li><Link to="/calendar">Calendar</Link></li>
                    <li>
                        <a href="#!" onClick={toggAccountSettingsMenu}>
                           Account Settings {isAccountSettinsOpen}
                        </a>
                        {isAccountSettinsOpen && (
                            <ul className="submenu">
                                <li><Link to="/profile">Profile</Link></li>
                               
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>

            <div>
                <header className="top-menu">
                    <h5>Wealth Tracker!!</h5>
                    <div className="menu-items">
                        <button onClick={goToProfile}>Profile</button>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </header>
            </div>

            <div className=".layout-main-content">
                <Outlet />

            </div>

        </div>
    );
};

export default Layout;
