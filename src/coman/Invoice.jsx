import React, { useState } from 'react';
import './invoicestyle.css';

const Invoice = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    invoiceDate: '',
    customerName: '',
    shippingAddress: '',
    billingAddress: '',
    date: '',
    paymentTerms: '',
    dueDate: '',
    poNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Invoice Data:', formData);
  };

  return (
    <div className="invoice-component">
      <form onSubmit={handleSubmit}>
        <div className="header-section">
          <div className="logo-placeholder">
            <img
              src="./images/logo-placeholder.png" /* Replace with your logo path */
              alt="Logo Placeholder"
              className="logo-image"
            />
            <p>+ Add Your Logo</p>
          </div>
          <div className="invoice-title">
            <h1>INVOICE</h1>
            <label>
              #
              <input
                type="text"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleInputChange}
                placeholder="1"
              />
            </label>
          </div>
        </div>

        <div className="info-section">
          <label>
            Customer Name:
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              placeholder="Enter customer name"
            />
          </label>

          <div className="address-section">
            <div className="bill-to">
              <h4>Bill To</h4>
              <textarea
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleInputChange}
                placeholder="Enter billing address"
              />
            </div>

            <div className="ship-to">
              <h4>Ship To</h4>
              <textarea
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleInputChange}
                placeholder="(optional)"
              />
            </div>
          </div>

          <div className="right-section">
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Payment Terms:
              <input
                type="text"
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Due Date:
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
              />
            </label>
            <label>
              PO Number:
              <input
                type="text"
                name="poNumber"
                value={formData.poNumber}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit Invoice
        </button>
      </form>
    </div>
  );
};

export default Invoice;
