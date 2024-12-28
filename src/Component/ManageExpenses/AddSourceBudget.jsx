import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StyleAddSourceBudget.css";
import { encrypt } from "../../auth-service/EncryptionUtility";
import noDataImage from '../../assets/Nodata.jpg'; // Adjust the path as necessary
// Utility to get cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const AddSourceBudget = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("add-budget");
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgetCategory, setBudgetCategory] = useState("");
  const [additionalComment, setAdditionalComment] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupFadeOut, setPopupFadeOut] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const userId = 2;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});

    const errors = {};
    if (!budgetName) {
      errors.budgetName = "Budget name is required.";
    }
    if (!budgetAmount || budgetAmount <= 0) {
      errors.budgetAmount = "Budget amount must be greater than 0.";
    }
    if (!budgetCategory) {
      errors.budgetCategory = "Budget category is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      return;
    }

    const budgetData = {
      sourceBudgetType: budgetName,
      sourceBudgetAmount: Number(budgetAmount),
      additionalComment,
      userId,
    };

    try {
      const encryptedMessage = await encrypt(JSON.stringify(budgetData));
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5004";
      const endpoint = `${backendUrl}/api/v1/sourcebudget/create`;
      const token = getCookie("token");

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: encryptedMessage,
      });

      const responseData = await response.json();

      if (response.ok && responseData.responseCode === "200") {
        setPopupVisible(true);
        setBudgetName("");
        setBudgetAmount("");
        setBudgetCategory("");
        setAdditionalComment("");
        setFieldErrors({});

        setTimeout(() => {
          setPopupFadeOut(true);
          setTimeout(() => {
            setPopupVisible(false);
            setPopupFadeOut(false);
          }, 500);
        }, 3000);
      } else {
        if (response.status === 401) {
          navigate("/login");
        } else {
          const errorText = await response.text();
          console.error("Response Error:", response.status, errorText);
          setFieldErrors((prev) => ({ ...prev, general: "Failed to submit the form. Please try again later." }));
        }
      }
    } catch (error) {
      console.error("Connection Error:", error);
      setFieldErrors((prev) => ({ ...prev, general: "An error occurred. Please check your connection and try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchBudgets = async () => {
    const budgetRequest = {
      userId: userId,
    };

    try {
      const encryptedMessage = await encrypt(JSON.stringify(budgetRequest));
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5004";
      const endpoint = `${backendUrl}/api/v1/sourcebudget/getById`;
      const token = getCookie("token");

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: encryptedMessage,
      });

      const responseData = await response.json();

      if (response.ok && responseData.responseCode === "200") {
        setBudgets(responseData.sourceBudgetsList);
      } else {
        console.error("Failed to fetch budgets:", responseData.responseMessage);
      }
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "view-budgets") {
      fetchBudgets();
    }
  }, [activeTab]);

  const renderAddBudgetTab = () => (
    <div>
      <h2 className="ad-title">Budget Source</h2>
      <h3 className="ad-subtitle">Add New Budget</h3>
      <form className="ad-form" onSubmit={handleSubmit}>
        <div className="ad-form-group">
          <label htmlFor="budget-name" className="ad-label">Budget Name</label>
          <input
            type="text"
            id="budget-name"
            className="ad-input"
            placeholder="Enter budget name"
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
          />
          {fieldErrors.budgetName && <p className="error-message">{fieldErrors.budgetName}</p>}
        </div>
        <div className="ad-form-group">
          <label htmlFor="budget-amount" className="ad-label">Budget Amount</label>
          <input
            type="number"
            id="budget-amount"
            className="ad-input"
            placeholder="Enter budget amount"
            value={budgetAmount}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                setBudgetAmount(value);
              }
            }}
          />
          {fieldErrors.budgetAmount && <p className="error-message">{fieldErrors.budgetAmount}</p>}
        </div>
        <div className="ad-form-group">
          <label htmlFor="budget-category" className="ad-label">Budget Category</label>
          <input
            type="text"
            id="budget-category"
            className="ad-input"
            placeholder="Enter budget category"
            value={budgetCategory}
            onChange={(e) => setBudgetCategory(e.target.value)}
          />
          {fieldErrors.budgetCategory && <p className="error-message">{fieldErrors.budgetCategory}</p>}
        </div>
        <div className="ad-form-group">
          <label htmlFor="additional-comment" className="ad-label">Additional Comment</label>
          <input
            type="text"
            id="additional-comment"
            className="ad-input"
            placeholder="Enter additional comment"
            value={additionalComment}
            onChange={(e) => setAdditionalComment(e.target.value)}
          />
        </div>
        <div className="ad-submit-btn">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
      {popupVisible && (
        <div className={`popup-top-right ${popupFadeOut ? "fade-out" : ""}`} role="alert">
          Budget submitted successfully!
        </div>
      )}
      {fieldErrors.general && (
        <div className="error-messages">
          <p>{fieldErrors.general}</p>
        </div>
      )}
    </div>
  );

  // const renderViewBudgetsTab = () => (
  //   <div>
  //     <h2>View Budgets</h2>
  //     <div>
  //       <h3>Budget List</h3>
  //       <table className="budget-table">
  //         <thead>
  //           <tr>
  //             <th>Name</th>
  //             <th>Amount</th>
  //             <th>Comment</th>
  //             <th>Date Added</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {budgets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((budget) => (
  //             <tr key={budget.sourceBudgetId}>
  //               <td>{budget.sourceBudgetType}</td>
  //               <td>{budget.sourceBudgetAmount}</td>
  //               <td>{budget.additionalComment}</td>
  //               <td>{new Date(budget.sourceBudgetAddedon).toLocaleString()}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //       <div className="pagination">
  //         <button onClick={() => setCurrentPage((prev) => Math.max(prev -  1, 1))} disabled={currentPage === 1}>
  //           Previous
  //         </button>
  //         <span>Page {currentPage}</span>
  //         <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage * itemsPerPage >= budgets.length}>
  //           Next
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
  const renderViewBudgetsTab = () => {
    const sortedBudgets = [...budgets].sort((a, b) => new Date(b.sourceBudgetAddedon) - new Date(a.sourceBudgetAddedon));
  
    // Calculate total pages
    const totalPages = Math.ceil(sortedBudgets.length / itemsPerPage);
  
    return (
      <div>  
        <div>
          {sortedBudgets.length === 0 ? (
            <div className="empty-list">
              <img src={noDataImage} alt="No data available" />
              <p>No budgets available. Please add a budget.</p>
            </div>
          ) : (
            <table className="budget-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Comment</th>
                  <th>Date Added</th>
                </tr>
              </thead>
              <tbody>
                {sortedBudgets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((budget) => (
                  <tr key={budget.sourceBudgetId}>
                    <td>{budget.sourceBudgetType}</td>
                    <td>{budget.sourceBudgetAmount}</td>
                    <td>{budget.additionalComment}</td>
                    <td>{new Date(budget.sourceBudgetAddedon).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="ad-pagination">
            {currentPage > 1 && (
              <span onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} style={{ cursor: 'pointer' }}>
                Previous
              </span>
            )}
            <span> Page {currentPage} of {totalPages} </span>
            {currentPage < totalPages && (
              <span onClick={() => setCurrentPage((prev) => prev + 1)} style={{ cursor: 'pointer' }}>
                Next
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };



  const StaticContainer = ({ budgets }) => {
    return (
      <div className="static-container">
        {budgets.length === 0 ? (
          <>
            <img src={noDataImage} alt="No data available" />
            <p>No budgets available. Please add a budget.</p>
          </>
        ) : (
          <p>There are {budgets.length} budgets available.</p>
        )}
      </div>
    );
  };



  return (
    <div className="ad-form-container">
      <div className="ad-tabs">
        <div className="ad-tabs">
          <span
            className={`ad-tab ${activeTab === "add-budget" ? "active" : ""}`}
            onClick={() => setActiveTab("add-budget")}
          >
            Add Budget
          </span>
          <span
            className={`ad-tab ${activeTab === "view-budgets" ? "active" : ""}`}
            onClick={() => setActiveTab("view-budgets")}
          >
            View Budgets
          </span>
        </div>
      </div>
      <div className="ad-tab-content">
        {activeTab === "add-budget" && renderAddBudgetTab()}
        {activeTab === "view-budgets" && renderViewBudgetsTab()}
      </div>
    </div>
  );
};

export default AddSourceBudget;