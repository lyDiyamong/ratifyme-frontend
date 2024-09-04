import { ThemeProvider } from "@emotion/react";
import theme from "./assets/themes";
import { CssBaseline } from "@mui/material";
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
