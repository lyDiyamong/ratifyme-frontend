
//Mui Import 
import { Box, Card, CardContent, Grid } from "@mui/material";

//Image Import
import AnB from "../../assets/images/AnB.svg";
import Emcast from "../../assets/images/Emcast.svg";
import TechA from "../../assets/images/TechA.svg";


const AnBLogoSvg = AnB;
const EmcastLogoSvg = Emcast;
const TechALogoSvg = TechA;


const  LogoCards = () => {
    //============ Start Card Data  ============
    const logoImage = [
        {
            logoSrc: AnBLogoSvg,
            alt: "AnB Logo"
        },
        {
            logoSrc: EmcastLogoSvg,
            alt: "Emcast Logo"
        },
        {
            logoSrc: TechALogoSvg,
            alt: "TechA Logo"
        },
        {
            logoSrc: EmcastLogoSvg,
            alt: "Emcast Logo"
        },
        {
            logoSrc: AnBLogoSvg,
            alt: "AnB Logo"
        },
    ];
    //============ End Card Data  ============

    const  InfoCard = ({ logoSrc, alt }) => {
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
            
            >{/* Start List of  LogoImage    */}
                {logoImage.map((card, index) => (
                    <Grid item key={index} paddingBottom="16px">
                        <InfoCard
                            logoSrc={card.logoSrc}
                            alt={card.alt}
                        />
                    </Grid>
                ))}
                {/*  End List of  LogoImage    */}
            </Grid>
        </Box>
        
    );
    //============ End Logo Card Contatiner ============
}

export default LogoCards;
