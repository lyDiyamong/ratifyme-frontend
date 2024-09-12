// React library import
import React from 'react';

// MUI Import
import {Button} from "@mui/material"

// Custom import
import theme from "../../assets/themes"

// <!-- ============ Start AddButtun Style ============ -->
const AddStyle = {
    bgcolor: theme.palette.primary.main,
    color: theme.palette.customColors.white,
    width: "100%",
    height: "35px",
    fontSize: theme.typography.body2,
    fontWeight: theme.fontWeight.semiBold,
    borderRadius: theme.customShape.btn,
}
// <!-- ============ End AddButtun Style ============ -->

// <!-- ============ Start IssueButtun Style ============ -->
const IssueStyle = {
    width: "75%",
    height: "35px",
    fontSize: theme.typography.body2,
    fontWeight: theme.fontWeight.semiBold,
    borderRadius: theme.customShape.btn,
}
// <!-- ============ End IssueButtun Style ============ -->


const BtnAddTo = () => {
    return (
        <Button variant="contained"
            sx={AddStyle}>
            Add earner to earner
        </Button>
    )
}

const BtnIssueTo = () => {
    return (
        <Button variant="outlined"
            sx={IssueStyle}>
            issue to earner
        </Button>
    )
}

export { BtnAddTo, BtnIssueTo };