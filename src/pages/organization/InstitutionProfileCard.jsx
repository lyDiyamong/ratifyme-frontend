// React import
import { useNavigate } from "react-router";

// MUI import
import { Box, Typography, Avatar } from "@mui/material";
import { Stack, styled } from "@mui/system";

// Custom import
import theme from "../../assets/themes";

const CardWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
    width: 300,
    height: 384,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
    fontFamily: theme.typography.fontFamily,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
        transform: "scale(1.03)",
        boxShadow: theme.customShadows.hover,
    },
}));

const CardImage = styled(Box)({
    height: 192,
    width: "100%",
    borderRadius: "20px 20px 0 0",
    overflow: "hidden",
    "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
});

const CardAvatar = styled(Box)({
    position: "absolute",
    width: 114,
    height: 114,
    backgroundColor: "#fff",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "calc(50% - 57px)",
});

const CardTitle = styled(Typography)({
    marginTop: 60,
    fontWeight: 500,
    fontSize: 18,
    color: "#000",
});

const CardSubtitle = styled(Typography)({
    marginTop: 10,
    fontWeight: 400,
    fontSize: 15,
    color: "#78858F",
});

const InstitutionProfileCard = ({ cardImgLogo, orgName, orgEmail, cardBgImage, institutionId }) => {
    // Get the first letter of orgName for the avatar
    const firstLetter = orgName ? orgName.charAt(0).toUpperCase() : "";

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/dashboard/organizations/${institutionId}`);
    };

    return (
        <CardWrapper onClick={handleCardClick} sx={{ boxShadow: theme.customShadows.default, cursor: "pointer" }}>
            <CardImage>
                <Box component="img" src={cardBgImage} alt="Background" />
            </CardImage>
            <CardAvatar>
                {cardImgLogo ? (
                    <Box
                        component="img"
                        src={cardImgLogo}
                        alt="Institution Logo"
                        style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                    />
                ) : (
                    <Avatar sx={{ width: 114, height: 114, fontSize: 40 }}>{firstLetter || "?"}</Avatar>
                )}
            </CardAvatar>
            <Stack sx={{ justifyContent: "center", alignItems: "center", p: 1 }}>
                <CardTitle textAlign="center">{orgName || "N/A"}</CardTitle>
                <CardSubtitle textAlign="center">{orgEmail || "noemail@gmail.com"}</CardSubtitle>
            </Stack>
        </CardWrapper>
    );
};

export default InstitutionProfileCard;
