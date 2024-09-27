import { useState } from "react";
import { Button } from "@mui/material";
import theme from "../../assets/themes";
import ModalContainer from "../../components/styles/ModalContainer";
import { useFetchEarnerQuery } from "../../store/api/earnerManagement/earnerApis";

const IssuerBadgeButton = ({ onGetEmail, control, issuerId }) => {
    const [open, setOpen] = useState(false);
    const { data: earners } = useFetchEarnerQuery();
    const emailOptions = earners?.data
        ?.filter((earner) => {
            return earner?.issuerId === issuerId;
        })
        .map((user) => {
            return user?.User;
        });

    console.log(emailOptions);
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
