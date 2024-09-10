import React from 'react';

import {Button} from "@mui/material"

import theme from "../../assets/themes"

const AddStyle = {
    bgcolor: theme.palette.primary.main,
    color: theme.palette.customColors.white,
    width: "140%",
    fontSize: theme.typography.body3,
    fontWeight: theme.fontWeight.semiBold,
    borderRadius: theme.customShape.btn,
}

const IssueStyle = {
    width: "100%",
    fontSize: theme.typography.body3,
    fontWeight: theme.fontWeight.semiBold,
    borderRadius: theme.customShape.btn,
}

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