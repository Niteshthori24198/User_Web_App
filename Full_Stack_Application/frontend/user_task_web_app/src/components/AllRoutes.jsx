import React from 'react'
import { Route, Routes } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import FeedPage from '../pages/FeedPage';
import TaskPage from '../pages/TaskPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ForgotPassword from '../pages/ForgotPassword';
import PrivateRoute from '../PrivateRoutes/PrivateRoute';

function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tasks" element={
                <PrivateRoute>
                    <TaskPage />
                </PrivateRoute>
            } />
            <Route path="/feed" element={
                <PrivateRoute>
                    <FeedPage />
                </PrivateRoute>
            } />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
    )
}

export default AllRoutes
