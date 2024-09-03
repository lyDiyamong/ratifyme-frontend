import { ThemeProvider } from "@emotion/react";
import theme from "./assets/themes";
import { CssBaseline } from "@mui/material";
import LandingRouter from "./routers/LandingRouter";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LandingRouter />
        </ThemeProvider>
    );
};

export default App;
