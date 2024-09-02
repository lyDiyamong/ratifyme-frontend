import { ThemeProvider } from "@emotion/react";
import theme from "./assets/themes";
import { CssBaseline } from "@mui/material";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        </ThemeProvider>
    );
};

export default App;
