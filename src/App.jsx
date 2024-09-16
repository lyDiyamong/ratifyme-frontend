// MUI Import
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Custom Import
import theme from "./assets/themes";

// Router Import
import LandingRouter from "./routers/LandingRouter";
import AuthRouter from "./routers/AuthRouter";
import DashbaordRouter from "./routers/DashboardRouter";
// import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <LandingRouter />
                <AuthRouter />
                <DashbaordRouter />
                {/* <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes> */}
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
