import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './customerListStyle.css';

const CustomerList = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [montlylimite, setMonthlyLimite] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewAll, setViewAll] = useState(false);

    const itemsPerPage = viewAll ? 8 : 5;

    // Function to fetch customers
    const fetchCustomers = async () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

        if (!token) {
            setError("No authentication token found.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5002/api/v1/customers/by-user',
                { userId: "21" },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            if (response.data.status_code === "200") {
                setCustomers(response.data.customers);
                setTotalCustomers(response.data.customers.length);
            } else {
                setError("Failed to fetch customers: " + response.data.message);
            }
        } catch (err) {
            setError("Error fetching customers: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }


        try {
            const response = await axios.get(
                'http://localhost:5001/api/limite/limits',
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            if (response.data && response.data.monthlyLimite !== undefined) {
                setMonthlyLimite(response.data.monthlyLimite);
            }
        } catch (err) {
            setError("Error fetching customers: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Calculate which items to show on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = viewAll ? indexOfLastItem - itemsPerPage : 0;
    const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);

    const handleViewAll = () => {
        setViewAll(true);
        setCurrentPage(1); // Reset to the first page for "View all" mode
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="customerList-dashboard-container">
            <div className="customerList-main-content">
             
                <section className="content-section">
                    <h1>My Customers</h1>
                    <div className="analytics-cards">
                        <div className="card">
                            <div className="card-header">
                                <span>Monthly Budget</span>
                                <span className="icon" style={{ backgroundColor: '#6f42c1' }}>💲</span>
                            </div>
                            <div className="card-content">
                            <h2>{montlylimite}</h2>
                                <span className="status up">↑ 12% Since last month</span>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <span>Total Customers</span>
                                <span className="icon" style={{ backgroundColor: '#17a2b8' }}>👥</span>
                            </div>
                            <div className="card-content">
                                <h2>{totalCustomers}</h2>
                                <span className="status down">↓ 16% Since last month</span>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <span>Task Progress</span>
                                <span className="icon" style={{ backgroundColor: '#f39c12' }}>📋</span>
                            </div>
                            <div className="card-content">
                                <h2>75.5%</h2>
                                <div className="progress-bar">
                                    <div className="progress" style={{ width: '75.5%' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <span>Total Profit</span>
                                <span className="icon" style={{ backgroundColor: '#6610f2' }}>📈</span>
                            </div>
                            <div className="card-content">
                                <h2>$15k</h2>
                                <span className="status">Since last month</span>
                            </div>
                        </div>
                    </div>

                    <div className="latest-section-transaction-history">
                        <div className="transaction-history">
                            <h3>Customer List</h3>
                            {loading ? (
                                <p>Loading customers...</p>
                            ) : error ? (
                                <p className="error-message">{error}</p>
                            ) : (
                                <table className="orders-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Contact No.</th>
                                            <th>Date Added</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((customer, index) => (
                                            <tr key={index}>
                                                <td>{customer.customer_name}</td>
                                                <td>{customer.customer_email}</td>
                                                <td>{customer.customer_phone}</td>
                                                <td>
                                                    {new Date(customer.createdOn).toLocaleString('en-GB', {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: false
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            {/* "View all" link or pagination buttons */}
                            {!viewAll ? (
                                <a href="#!" onClick={handleViewAll} className="view-all">View all →</a>
                            ) : (
                                <>
                                    <button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))} className="btn btn-secondary mt-3" disabled={currentPage === 1}>Back</button> {/* Back button for pagination */}
                                    {currentItems.length === itemsPerPage && (
                                        <button onClick={handleNextPage} className="btn btn-primary mt-3">Next</button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CustomerList;
