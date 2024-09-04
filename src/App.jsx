// MUI Import
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

// Custom Import
import theme from "./assets/themes";

// Router Import
import LandingRouter from "./routers/LandingRouter";
import AuthRouter from "./routers/AuthRouter";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LandingRouter />
            <AuthRouter />
        </ThemeProvider>
    );
};

export default App;
