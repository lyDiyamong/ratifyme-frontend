import { green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1A87EC",
            light: "#D8ECFF", // primary-100
            dark: "#1869B8", // primary-300
            contrastText: "#0C0C0C", // text-primary
        },
        secondary: {
            main: "#004385", // primary-400
            light: "#65A9ED", // primary-200
            dark: "#1869B8", // primary-300
            contrastText: "#ADADAD", // text-secondary
        },
        text: {
            primary: "#0C0C0C", // text-primary.

            secondary: "#637381", // text-secondary
            disabled: "#707070", // text-secondary-2
        },
        background: {
            default: "#F9FBFF", // bg-primary
            secondary: "#F5F7F8",
            success: "#E7F0DC",
            error: "#FFEADD",
        },
        divider: "#E2E2E2", // border-primary
        customColors: {
            orange100: "#FFF6EA", // SP-Orange-100
            orange200: "#ffe4bd", // SP-Orange-100
            orange300: "#ffa929", // SP-Orange-200
            orange400: "#FF9901", // SP-Orange-200
            purple100: "#E2E2E2", // SP-Purple-100
            purple200: "#944cff", // SP-Purple-200
            green100: "#F4F7ED", // SP-Green-500
            green200: "#B3E4B0", // SP-Green-100
            green300: "#0BA800", // SP-Green-200
            green400: "#0B9710", // SP-Green-400
            red100: "#ffc1c1", // SP-Red-100
            red200: "#ff3838", // SP-Red-200
            red300: "#E63232", // SP-Red-300
            red400: "#CC2D2D", // SP-Red-400
            gray100: "rgba(178, 178, 178, 0.1)",
            gray200: "#E2E2E2",
            gray300: "#ADADAD",
            gray500: "#637381",
            gray600: "#1f1c2e",
            white: "#FFFFFF", //SP-White
        },
        cardBorder: "#C8C8C8",
        action: {
            hover: "#E5F3FF",
            selected: "#C7E4FF",
            error: "#FFF2F2",
        },
    },
    typography: {
        fontFamily: "DM Sans, Arial, sans-serif",
        h1: {
            fontSize: "2.5rem", // Default size ( 40px )
            fontFamily: "Poppins, Arial, sans-serif",
            "@media (max-width:480px)": {
                fontSize: "2rem", // Mobile size ( 32px )
            },
        },
        h2: {
            fontSize: "2rem", // Default size ( 32px )
            fontFamily: "Poppins, Arial, sans-serif",
            "@media (max-width:480px)": {
                fontSize: "1.5rem", // Mobile size ( 24px )
            },
        },
        h3: {
            fontSize: "1.5rem", // Default size ( 24px )
            fontFamily: "Poppins, Arial, sans-serif",
            "@media (max-width:480px)": {
                fontSize: "1rem", // Mobile size ( 16px )
            },
        },
        h4: {
            fontSize: "1.125rem", // Default size ( 20px )
            fontFamily: "Poppins, Arial, sans-serif",
            "@media (max-width:480px)": {
                fontSize: "1rem", // Mobile size ( 16px )
            },
        },
        h5: {
            fontSize: "1rem", // Default size ( 16px )
            fontFamily: "Poppins, Arial, sans-serif",
            "@media (max-width:480px)": {
                fontSize: "0.875rem", // Mobile size ( 14px )
            },
        },
        h6: {
            fontSize: "0.875rem", // Default size ( 14px )
            fontFamily: "Poppins, Arial, sans-serif",
            "@media (max-width:480px)": {
                fontSize: "0.625rem", // Mobile size ( 12px )
            },
        },
        body1: {
            fontSize: "1rem", // Default size ( 16px )
            "@media (max-width:480px)": {
                fontSize: "0.875rem", // Mobile size ( 14px )
            },
        },
        body2: {
            fontSize: "0.875rem", // Default size ( 14px )
            "@media (max-width:480px)": {
                fontSize: "0.75rem", // Mobile size ( 12px )
            },
        },
        body3: {
            fontSize: "0.75rem", // Default size ( 12px )
            "@media (max-width:480px)": {
                fontSize: "0.5rem", // Mobile size ( 10px )
            },
        },
    },
    fontWeight: {
        default: 400,
        semiBold: 500,
        bold: 600,
        extraBold: 700,
    },
    customShadows: {
        default: "#E2E2E2 0px 4px 10px",
    },
    shape: {
        borderRadius: "8px", // Default borderRadius
    },
    customShape: {
        input: "8px",
        card: "12px",
        section: "16px",
        btn: "100px",
    },

    breakpoints: {
        values: {
            xss: 0,
            xs: 320, // Mobile devices (small screens)
            sm: 600, // Tablets and small screens
            md: 900, // Medium screens (e.g., small desktops)
            lg: 1200, // Large screens (e.g., large desktops)
            xl: 1920, // Extra large screens (e.g., ultra-wide monitors)
        },
    },
    
    // This overwrite the DatePicker Selection to white
    components: {
        MuiPickersYear: {
            styleOverrides: {
                yearButton: {
                    "&.Mui-selected": {
                        color: "white",
                    },
                    "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                    },
                },
            },
        },
        MuiPickersMonth: {
            styleOverrides: {
                monthButton: {
                    "&.Mui-selected": {
                        color: "white",
                    },
                    "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                    },
                },
            },
        },
        MuiPickersDay: {
            styleOverrides: {
                dayWithMargin: {

                    '&.Mui-selected': {
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                },
            },
        },
        // You can add more component overrides here
    },
});

export default theme;
