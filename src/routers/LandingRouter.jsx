import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingLayout from "../layouts/landing";
import HomePage from "../pages/landing/HomePage";
import ContactUsPage from "../pages/contactus";

const LandingRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LandingLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/contactus" element={<ContactUsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default LandingRouter;
