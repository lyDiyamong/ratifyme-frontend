import { useState } from "react";
import { Button } from "@mui/material";
import theme from "../../assets/themes";
import ModalContainer from "../../components/styles/ModalContainer";

const IssuerBadgeButton = ({ onGetEmail, control }) => {
    const [open, setOpen] = useState(false);
    const emailOptions = [
        {
            id: "1",
            email: "Slyhour22@gmail.com",
        },
        {
            id: "2",
            email: "Slyhour23@gmail.com",
        },
        {
            id: "3",
            email: "Slyhour24@gmail.com",
        },
        {
            id: "4",
            email: "Slyhour25@gmail.com",
        },
        {
            id: "5",
            email: "Slyhour26@gmail.com",
        },
        {
            id: "6",
            email: "Slyhour29@gmail.com",
        },
    ];

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.customColors.white,
                    fontSize: theme.typography.body1,
                    fontWeight: theme.fontWeight.bold,
                    borderRadius: theme.customShape.btn,
                    px: 3,
                }}
            >
                Add Earner
            </Button>
            <ModalContainer
                open={open}
                onClose={() => setOpen(false)}
                title="Select Earners"
                options={emailOptions}
                onGetEmail={onGetEmail}
                control={control}
            />
        </>
    );
};

export default IssuerBadgeButton;
