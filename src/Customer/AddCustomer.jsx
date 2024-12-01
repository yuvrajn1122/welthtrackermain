import React, { useState } from "react";
import './addCustomerStyle.css';
import axios from "axios";

const AddCustomer = () => {
    const [customerData, setCustomerData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({ ...customerData, [name]: value });
    };

    // Form validation
    const validateForm = () => {
        const errors = {};
        if (!customerData.name) errors.name = "Name is required";
        if (!customerData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(customerData.email)) {
            errors.email = "Email is invalid";
        }
        if (!customerData.phone) {
            errors.phone = "Phone is required";
        } else if (!/^\d{10}$/.test(customerData.phone)) {
            errors.phone = "Phone number should be 10 digits";
        }
        if (!customerData.address) errors.address = "Address is required";

        return errors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                // Get token from cookies
                const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

                // Submit form data to the backend with token in headers
                const response = await axios.post("http://localhost:5002/api/v1/customers/addCustomer", {
                    fullName: customerData.name,
                    email: customerData.email,
                    phone: customerData.phone,
                    address: customerData.address
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                    }
                });
                window.location.href = "/dashboard";
               
                setSubmitted(true);
                // Clear form after submission
                setCustomerData({
                    name: "",
                    email: "",
                    phone: "",
                    address: ""
                });
            } catch (error) {
                console.error("Error adding customer:", error);
                // Handle error appropriately (e.g., set an error message)
            }
        } else {
            setSubmitted(false);
        }
    };

    return (
        <>
        <div className="add-customer-container">
            <h2>Add New Customer</h2>

            {submitted && <div className="success-message">Customer added successfully!</div>}

            <form onSubmit={handleSubmit} className="customer-form">
                {/* Name Field */}
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={customerData.name}
                        onChange={handleChange}
                        placeholder="Enter customer name"
                    />
                    {formErrors.name && <span className="error">{formErrors.name}</span>}
                </div>

                {/* Email Field */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={customerData.email}
                        onChange={handleChange}
                        placeholder="Enter customer email"
                    />
                    {formErrors.email && <span className="error">{formErrors.email}</span>}
                </div>

                {/* Phone Field */}
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={customerData.phone}
                        onChange={handleChange}
                        placeholder="Enter customer phone"
                    />
                    {formErrors.phone && <span className="error">{formErrors.phone}</span>}
                </div>

                {/* Address Field */}
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={customerData.address}
                        onChange={handleChange}
                        placeholder="Enter customer address"
                    />
                    {formErrors.address && <span className="error">{formErrors.address}</span>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-btn">Add Customer</button>
            </form>
        </div>
        </>
    );
};

export default AddCustomer;
