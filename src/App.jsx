// MUI Import
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

// Custom Import
import theme from "./assets/themes";

// Router Import
import LandingRouter from "./routers/LandingRouter";
import AuthRouter from "./routers/AuthRouter";
import DashbaordRouter from "./routers/DashboardRouter";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <LandingRouter />
                <DashbaordRouter />
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
