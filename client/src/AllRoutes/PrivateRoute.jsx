import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuth = localStorage.getItem('token');
    if (!isAuth) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;