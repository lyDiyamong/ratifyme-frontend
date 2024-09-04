//Import React 

//Import Mui
import { Box, Card, CardContent, Grid } from "@mui/material";

//Import Image
import AnB from "../../assets/images/AnB.svg";
import Emcast from "../../assets/images/Emcast.svg";
import TechA from "../../assets/images/TechA.svg";


//LogoCards Component
function LogoCards() {
    //============ Start Card Data  ============
    const logoImage = [
        {
            logoSrc: AnB,
            alt: "AnB Logo"
        },
        {
            logoSrc: Emcast,
            alt: "Emcast Logo"
        },
        {
            logoSrc: TechA,
            alt: "TechA Logo"
        },
        {
            logoSrc: Emcast,
            alt: "Emcast Logo"
        },
        {
            logoSrc: AnB,
            alt: "AnB Logo"
        },
    ];
    //============ End Card Data  ============

    function InfoCard({ logoSrc, alt }) {
        return (
            //============ Start Logo Card  ============
            <Card
                sx={{
                    width: "153px",
                    height: "112px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0",
                   
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", 
                    borderRadius: "8px", 
                    overflow: "hidden", 
                }}
            >
                <CardContent sx={{ paddingBottom: "0" }}>
                    <Box
                        component="img"
                        src={logoSrc}
                        alt={alt}
                        sx={{
                            paddingBottom: "0",
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                            
                        }}
                    />
                </CardContent>
            </Card>
        );
        //============ End Logo Card  ============
    }

    return (
        //============ Start Logo Card Contatiner ============
        <Box sx={{ padding: "20px", marginBottom: "12px",  }}>
            <Grid 
            container spacing={4} 
            justifyContent="center"
            sx={{
                "@media (max-width:563px)":
                {
                     gap: "25px"
                }
             }}
            
            >{/* ============ Start List of  LogoImage   ============ */}
                {logoImage.map((card, index) => (
                    <Grid item key={index} paddingBottom="16px">
                        <InfoCard
                            logoSrc={card.logoSrc}
                            alt={card.alt}
                        />
                    </Grid>
                ))}
                {/* ============ End List of  LogoImage   ============ */}
            </Grid>
        </Box>
        
    );
    //============ End Logo Card Contatiner ============
}

export default LogoCards;
