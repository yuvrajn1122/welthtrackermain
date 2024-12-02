import React, { useState } from "react";
import { Link, Outlet } from 'react-router-dom';
import './dashboardStyle.css';

const Dashboard = () => {
    // Example product and order data
    const latestProducts = [
        { name: "Soja & Co. Eucalyptus", date: "Mar 8, 2024", image: "/path/to/image1.jpg" },
        { name: "Necessaire Body Lotion", date: "Mar 8, 2024", image: "/path/to/image2.jpg" },
        { name: "Ritual of Sakura", date: "Mar 8, 2024", image: "/path/to/image3.jpg" },
        { name: "Lancome Rouge", date: "Mar 8, 2024", image: "/path/to/image4.jpg" },
        { name: "Erbology Aloe Vera", date: "Mar 8, 2024", image: "/path/to/image5.jpg" }
    ];

    const latestOrders = [
        { order: "ORD-007", customer: "Ekaterina Tankova", date: "Mar 8, 2024", status: "Pending", amount: (Math.random() * 100).toFixed(2) },
        { order: "ORD-006", customer: "Cao Yu", date: "Mar 8, 2024", status: "Delivered", amount: (Math.random() * 100).toFixed(2) },
        { order: "ORD-004", customer: "Alexa Richardson", date: "Mar 8, 2024", status: "Refunded", amount: (Math.random() * 100).toFixed(2) },
        { order: "ORD-003", customer: "Anje Keizer", date: "Mar 8, 2024", status: "Pending", amount: (Math.random() * 100).toFixed(2) },
        { order: "ORD-002", customer: "Clarke Gillebert", date: "Mar 8, 2024", status: "Delivered", amount: (Math.random() * 100).toFixed(2) }
    ];

    return (
        <>
            <div className="dashboard-container">

                <div className="dashbord-main-content ">
                    {/* <Outlet /> */}
                    <section className="dashbord-content-section">
                        
                        <div className="analytics-cards">
                            <div className="card">
                                <div className="card-header">
                                    <span>Monthly Budget</span>
                                    {/* <span className="icon" style={{ backgroundColor: '#6f42c1' }}>💲</span> */}
                                </div>
                                <div className="card-content">
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <span>Total Customers</span>
                                    {/* <span className="icon" style={{ backgroundColor: '#17a2b8' }}>👥</span> */}
                                </div>
                                <div className="card-content">
                                    <h2>1.6k</h2>
                                    {/* <span className="status down">↓ 16% Since last month</span> */}
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <span>Task Progress</span>
                                    {/* <span className="icon" style={{ backgroundColor: '#f39c12' }}>📋</span> */}
                                </div>
                                <div className="card-content">
                                    <h2>75.5%</h2>
                                    <div className="progress-bar">

                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <span>Total Profit</span>
                                    {/* <span className="icon" style={{ backgroundColor: '#6610f2' }}>📈</span> */}
                                </div>
                                <div className="card-content">
                                    <h2>$15k</h2>
                                    {/* <span className="status">Since last month</span> */}
                                </div>
                            </div>
                        </div>

                        <div className="latest-section">
                            <div className="latest-orders">
                                <h3>My Customers</h3>
                                <table className="orders-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone Number</th>
                                            <th>Join Date</th>
                                            <th>Total Spent</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {latestOrders.map((customer, index) => (
                                            <tr key={index}>
                                                <td>{customer.customer}</td>
                                                <td>{customer.email || "N/A"}</td> {/* Update with actual customer data */}
                                                <td>{customer.phone || "N/A"}</td> {/* Update with actual customer data */}
                                                <td>{customer.date}</td>
                                                <td>${customer.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <a href="#!" className="view-all">View all →</a>
                            </div>
                        </div>

                        <div className="latest-section-transaction-history">
                            <div className="transaction-history">
                                <h3>Transaction History</h3>
                                <table className="orders-table">
                                    <thead>
                                        <tr>
                                            <th>Transaction ID</th>
                                            <th>Customer</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {latestOrders.map((transaction, index) => (
                                            <tr key={index}>
                                                <td>{transaction.order}</td>
                                                <td>{transaction.customer}</td>
                                                <td>{transaction.date}</td>
                                                <td>${transaction.amount}</td>
                                                <td className={`status ${transaction.status.toLowerCase()}`}>{transaction.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <a href="#!" className="view-all">View all →</a>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </>
    );
};

export default Dashboard;