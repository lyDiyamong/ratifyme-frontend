//Import React 
import React from "react";
//Import Mui

import { useTheme } from "@mui/material/styles";
import { Box} from  "@mui/material";
import LogoCards from "./CompanyLogoCard.jsx";





//Our Customer Component
const  OurCustomer = () =>{

    const theme = useTheme();
    return (
        //============ Start Our Customer Section  ============
        <Box component="section"
            sx={{
            display: "flex",
            flexDirection:"column",
            justifyContent: "end",
            margin: "0",
            width: "100%",
            maxWidth: "none",
            backgroundColor: theme.palette.primary.dark,
            minHeight: "248px",
            padding: "0",
        }}
        >{/* ============ Start Tittle   ============ */}
            <Box component= "div"
                sx={{
                    color: "white",
                    textAlign: "center",
                    
                    fontWeight: "600",
                    fontSize: "20px"
                }}>
                <p>Our Customer</p>
            </Box>
        {/* ============ End Tittle   ============ */}
            
            <LogoCards />
        </Box> 
         //============ End Our Customer Section  ============     
    );
};

export default OurCustomer;

