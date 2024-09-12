//Import Mui
import { Box, Card, CardContent, Grid } from "@mui/material";
//Custome Import
import logoImage from "../../data/ourCustomerData";
import AnBLogoSvg from "../../assets/images/AnB.svg";

//LogoCards Component

const InfoCard = ({ logoSrc, alt }) => {
    return (
        //============ Start Logo Card  ============
        <Card
            sx={{
                width: "153px",
                height: "112px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                overflow: "hidden",
            }}
        >
            <CardContent>
                <Box
                    component="img"
                    src={logoSrc}
                    alt={alt}
                    sx={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                        display: "flex",
                        alignItems: "center",
                    }}
                />
            </CardContent>
        </Card>
    );
};

const LogoCards = () => {
    return (
        // Start Logo Card Contatiner
        <Box sx={{ padding: "20px", marginBottom: "12px" }}>
            <Grid
                container
                spacing={4}
                justifyContent="center"
                sx={{
                    "@media (max-width:563px)": {
                        gap: "25px",
                    },
                }}
            >
                {/* Start List of  LogoImage */}
                {logoImage.map((card, index) => (
                    <Grid item key={index} paddingBottom="16px">
                        <InfoCard logoSrc={card.logoSrc} alt={card.alt} />
                    </Grid>
                ))}
                {/*  End List of  LogoImage   */}
            </Grid>
        </Box>
    );
    // End Logo Card Contatiner
};
//============ End Logo Card  ============

export default LogoCards;
