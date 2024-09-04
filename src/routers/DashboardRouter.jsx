import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/dasboard";
import Dashboard from "../pages/dasboard";

const DashbaordRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default DashbaordRouter;
