import { Box, Typography, Card } from "@mui/material";
import theme from "../../assets/themes"; // Assuming you have a theme file

const SignupOptionCard = ({ title, description, onClick, circleBg, icon }) => {
    return (
        <Card
            onClick={onClick}
            sx={{
                position: "relative",
                maxWidth: "500px",
                backgroundColor: "white",
                p: 3,
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.09)",
                cursor: "pointer",
                transition: "transform 0.3s ease",
                "&:hover": {
                    transform: "scale(1.05)",
                },
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: "96px",
                    height: "96px",
                    backgroundColor: circleBg,
                    borderRadius: "50%",
                    top: "-28px",
                    right: "-20px",
                }}
            />

            <Box component="img" src={icon} sx={{ fill: theme.palette.primary.main, width: "100px" }}></Box>

            {/* Title */}
            <Typography variant="h5" sx={{ fontWeight: "bold", pt: 2, textWrap: 'wrap' }}>
                {title}
            </Typography>

            {/* Description */}
            <Typography variant="body2" sx={{ color: "text.secondary", pt: 1, lineHeight: 1.6 }}>
                {description}
            </Typography>
        </Card>
    );
};

export default SignupOptionCard;
