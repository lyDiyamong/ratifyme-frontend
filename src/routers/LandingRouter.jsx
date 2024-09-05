import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingLayout from "../layouts/landing";
import HomePage from "../pages/landing/HomePage";
import PricePage from "../pages/landing/PricePage";

const LandingRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LandingLayout />}>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/price" element={<PricePage />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default LandingRouter;
