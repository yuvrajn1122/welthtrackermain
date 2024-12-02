import React, { useState, useEffect } from "react";
import "./AddExpensesStyle.css";

const AddExpenses = () => {
    const [activeTab, setActiveTab] = useState("expenses");
    const [currentDate, setCurrentDate] = useState("");

    // Mock data for Categories
    const categoriesData = [
        {
            dateAdded: "2024-12-01",
            categoryType: "Groceries",
            amountAdded: 200,
            amountAvailable: 150,
        },
        {
            dateAdded: "2024-12-02",
            categoryType: "Transport",
            amountAdded: 100,
            amountAvailable: 80,
        },
        {
            dateAdded: "2024-12-03",
            categoryType: "Entertainment",
            amountAdded: 300,
            amountAvailable: 250,
        },
    ];

    // Function to display the current date
    useEffect(() => {
        const today = new Date();
        const dateStr = today.toDateString();
        setCurrentDate(dateStr);
    }, []);

    return (
        <div className="container-expense">
            {/* Top navigation links */}
            <div className="top-links">
                <span
                    className={activeTab === "expenses" ? "active" : ""}
                    onClick={() => setActiveTab("expenses")}
                >
                    Espense Catogory
                </span>
                <span
                    className={activeTab === "categories" ? "active" : ""}
                    onClick={() => setActiveTab("categories")}
                >
                    Categories Added
                </span>
                <span
                    className={activeTab === "budget" ? "active" : ""}
                    onClick={() => setActiveTab("budget")}
                >
                    Monthly Budget
                </span>
            </div>

            {/* Date display */}
            {/* <div className="date-display">Today's Date: {currentDate}</div> */}

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === "expenses" && (
                    <div id="expenses">

                        <form className="budget-form">
                            <label htmlFor="select-month-budget">Select Month</label>
                            <select id="select-month" name="select-month">
                                <option value="" disabled selected>
                                    Select a month
                                </option>
                                <option value="january">January</option>
                                <option value="february">February</option>
                                <option value="march">March</option>
                                {/* Add more months as needed */}
                            </select>

                            <label htmlFor="category-type">Category Type</label>
                            <input
                                type="text"
                                id="category-type"
                                name="category-type"
                                placeholder="Enter category type"
                            />

                            <label htmlFor="budget-amount">Todays Budget Amount</label>
                            <input
                                type="text"
                                id="budget-amount"
                                name="budget-amount"
                                placeholder="Enter budget amount"
                            />
<div className="submit-btn">
                            <button type="submit" >
                                Submit
                            </button>
                            </div>
                        </form>
                    </div>
                )}

                {activeTab === "categories" && (
                    <div id="categories">

                        <table>
                            <thead>
                                <tr>
                                    <th>Date Added</th>
                                    <th>Category Type</th>
                                    <th>Amount Added</th>
                                    <th>Amount Available</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoriesData.map((category, index) => (
                                    <tr key={index}>
                                        <td>{category.dateAdded}</td>
                                        <td>{category.categoryType}</td>
                                        <td>${category.amountAdded}</td>
                                        <td>${category.amountAvailable}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "budget" && (
                    <div id="budget">

                        <form className="budget-form">
                            <label htmlFor="select-month-budget">Select Month</label>
                            <select id="select-month-budget" name="select-month-budget">
                                <option value="" disabled selected>
                                    Select a month
                                </option>
                                <option value="january">January</option>
                                <option value="february">February</option>
                                <option value="march">March</option>
                                {/* Add more months as needed */}
                            </select>

                            <label htmlFor="category-type-budget">Category Type</label>
                            <input
                                type="text"
                                id="category-type-budget"
                                name="category-type-budget"
                                placeholder="Enter category type"
                            />

                            <label htmlFor="budget-amount-budget">Monthly Budget Amount</label>
                            <input
                                type="text"
                                id="budget-amount-budget"
                                name="budget-amount-budget"
                                placeholder="Enter budget amount"
                            />

<div className="submit-btn">
                            <button type="submit" >
                                Submit
                            </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddExpenses;