import React, { useState } from 'react';
import './payStyle.css';

const Pay = () => {
    // Hardcoded customer data
    const customers = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Alice Johnson' },
    ];

    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [amount, setAmount] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Reset the form or perform other actions if needed
    };

    return (
        <div className="pay-container">
            <h1>Payment Page</h1>
            <div className="form-frame">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="customer">Customer Name:</label>
                        <select
                            id="customer"
                            value={selectedCustomer}
                            onChange={(e) => setSelectedCustomer(e.target.value)}
                            required
                        >
                            <option value="">Select a customer</option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="amount">Amount:</label>
                        <input
                            type="number"
                            id="amount"
                            placeholder='Enter Pay Amount'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            min="0"
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit">Submit Payment</button>
                    </div>
                </form>
            </div>

            {submitted && (
                <div className="submission-confirmation">
                    <h2>Payment Submitted</h2>
                    <p>Customer ID: {selectedCustomer}</p>
                    <p>Amount: ${amount}</p>
                </div>
            )}
        </div>
    );
};

export default Pay;
