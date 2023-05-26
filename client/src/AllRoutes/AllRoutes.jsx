import React from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "../Pages/DashBoard";
import AuthForm from "../Pages/AuthForm";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthForm />}></Route>
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <DashBoard />
                    </PrivateRoute>
                }
            ></Route>
        </Routes>
    );
};

export default AllRoutes;