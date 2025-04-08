import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';

const Auth: React.FC = () => {
  return (
    <div className="auth-container">
      <Header />
      <div className="auth-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Auth; 