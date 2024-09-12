// React library import
import React from "react"

// Import MUI
import { Stack } from "@mui/material"

// Custom Import
import theme from "../../assets/themes"

// Section Style
const sectionStyle = {
    boxShadow: theme.customShadows.default,
    borderRadius: theme.customShape.section,
    justifyContent: "space-between",
    alignItems: "center",
    bgcolor: theme.palette.customColors.white,
}

const PageSection = ({children}) => {
    return (
        <Stack
                component="section"
                flexDirection={{ xs: "column", md: "row" }}
                sx={sectionStyle}>
            {children}
        </Stack>
    )
}

export default PageSection