import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthForm from "../Pages/AuthForm";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/Home";
import Dashboard from "../Pages/DashBoard";

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthForm />}></Route>
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            ></Route>
        </Routes>
    );
};

export default AllRoutes;