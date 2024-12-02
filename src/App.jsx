import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './auth-service/Login';
import Register from './auth-service/Register';
import Dashboard from './Dashboard/Dashboard';
import Profile from './Dashboard/Profile';
import CalendarPage from './Account-Settings/CalendarPage';
import ChangePassword from './Account-Settings/ChangePassword';
import AddCustomer from './Customer/AddCustomer';
import CustomerList from './Customer/CustomerList';
import PrivateRoute from './auth-service/Privateroute';
import Layout from './Component/layout';
import HomePage from './Component/Homepage/HomePage';
import Pay from './Component/Payreciver/Pay';
import ForgotPassword from './auth-service/ForgotPassword';
import ForgetPasswordSuccessMessage from './auth-service/ForgetPasswordSuccessMessage';
import ResetPassword from './coman/ResetPassword';
import VerifyEmailPage from './coman/VerifyEmailPage';
import SupportForm from './Contactus/SupportForm';
import DemoLayout from './Dashboard/DemoLayout';
import AddExpenses from './Component/ManageExpenses/AddExpenses';


<link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    integrity="sha384-w74fnuu5c0HME1jc65V9j4bSdfvdfELtV9hgf0HR9g/EA6W/1vZ4po/xq6lg5wi7"
    crossorigin="anonymous"
/>

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/successMessage" element={<ForgetPasswordSuccessMessage />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/verifyEmail" element={<VerifyEmailPage />} />
        <Route path="/contact-Us" element={<SupportForm />} />
        <Route path="/demoLayot" element={<DemoLayout />} />
        
        <Route path="/" element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="customerList" element={<CustomerList />} />
            <Route path="addCustomer" element={<AddCustomer />} />
            <Route path="payCustomer" element={<Pay />} />
            <Route path="/addExpense" element={<AddExpenses />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
