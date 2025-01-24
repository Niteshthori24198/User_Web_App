import React from "react";
import { Navigate } from "react-router-dom";
import { getData } from "../utils/handlestorage";

const PrivateRoute = ({ children }) => {
    const token = getData("userInfo")?.token;
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};


export default PrivateRoute;
