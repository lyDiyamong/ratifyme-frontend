// MUI Import
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Custom Import
import theme from "./assets/themes";

// Router Import
import LandingRouter from "./routers/LandingRouter";
import AuthRouter from "./routers/AuthRouter";
import DashboardRouter from "./routers/DashboardRouter";
import PublicPageRouter from "./routers/PublicPage";
import NotFoundPage from "./pages/notFound";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    {/* Define unique paths for each router */}
                    <Route path="/" element={<LandingRouter />} />
                    <Route path="/auth/*" element={<AuthRouter />} />
                    <Route path="/dashboard/*" element={<DashboardRouter />} />
                    <Route path="/public/*" element={<PublicPageRouter />} />

                    {/* Catch-all route for unmatched paths */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <PublicPageRouter />
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
