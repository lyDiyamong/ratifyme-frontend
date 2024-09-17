// React library import
import React from 'react';
import { useState } from "react";

// MUI Import
import { Box, Button, Stack } from "@mui/material";

// Custom import
import theme from "../../../assets/themes";

const AddStyle = {
    bgcolor: theme.palette.primary.main,
    color: theme.palette.customColors.white,
    width: "100%",
    height: "35px",
    fontSize: theme.typography.body3,
    fontWeight: theme.fontWeight.semiBold,
    borderRadius: theme.customShape.btn,
};
const IssueStyle = {
    width: "75%",
    height: "35px",
    fontSize: theme.typography.body3,
    fontWeight: theme.fontWeight.semiBold,
    borderRadius: theme.customShape.btn,
};
const BtnAddTo = ({btnaction}) => {
    const handleClick = () => {
        console.log("Add earner to badge clicked");
        // Add your actual logic here, e.g., call an API, update state, etc.
    };

    return (
        <Button variant="contained"
            sx={AddStyle}
            onClick={handleClick}
        >
            Add earner to badge
        </Button>
    );
};

const BtnIssueTo = ({btnaction}) => {
    const handleClick = () => {
        console.log("Issue to earner clicked");
        // Add your actual logic here, e.g., call an API, update state, etc.
    };

    return (
        <Button variant="outlined"
            sx={IssueStyle}
            onClick={handleClick}
        >
            Issue to earner
        </Button>
    );
};

const AdminButton = ({btnaction}) => {
    const [isApproved, setIsApproved] = useState(false);

    const ApproveButton = () => {
        if (isApproved) {
            return (
                <Button variant='contained' sx={{borderRadius: theme.customShape.btn, color: theme.palette.customColors.black, fontSize: theme.typography.body1,}} disabled>
                    Approved
                </Button>
            );
        } else {
            return (
                <Button variant='contained' sx={{borderRadius: theme.customShape.btn, color: theme.palette.customColors.white, fontSize: theme.typography.body1,}} onClick={() => {
                    setIsApproved(true);
                    console.log("Approved");
                }}>
                    Approve
                </Button>
            );
        }
    };

    return (
        <Box>
            <ApproveButton />
        </Box>
    );
};


const IssuerButton = ({btnaction}) => {
    return (
        <Stack
            component="div"
            spacing={0.5}
            direction="row"
            sx={{
                mt: 1,
                justifyContent: "space-between", // Space between buttons
                maxWidth: "350px",
                width: "100%" // Ensure Stack takes full width of the parent Box
            }}
        >
            <BtnAddTo />
            <BtnIssueTo />
        </Stack>
    );
};


const OverviewButton = ({ btnstatus, btnaction }) => {
    if (btnstatus === 'Admin') {
        return <AdminButton />;
    } else if (btnstatus === 'Issuer') {
        return <IssuerButton />;
    } else {
        // Handle unexpected status values or provide a default component
        return <p>Invalid status</p>;
    }
};

export default OverviewButton;
