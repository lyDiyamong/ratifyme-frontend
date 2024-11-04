// React library import
import { useState } from "react";

// MUI import
import { Button } from "@mui/material";
import theme from "../../assets/themes";

// Custom import
import ModalContainer from "./badgeDetail/ModalContainer";

// API import
import { useFetchEarnerQuery } from "../../store/api/earnerManagement/earnerApis";
import { useFetchEmailEarnerQuery } from "../../store/api/achievements/achievementApi";

const IssuerBadgeButton = ({ onGetEmail, control, issuerId, badgeId, achievementId, setHasEarner }) => {
    const [open, setOpen] = useState(false);
    const { data: earners } = useFetchEarnerQuery({ issuerId });
    const { data: email } = useFetchEmailEarnerQuery({
        achievementId,
        page: "",
        limit: "",
        sort: "",
        order: "",
        search: "",
    });

    const emailOptions = earners?.data
        ?.filter((earner) => {
            return earner?.issuerId === issuerId;
        })
        .map((user) => {
            return user?.User;
        });
    return (
        // Start Add Earner Button
        <>
            <Button
                onClick={() => setOpen(true)}
                variant="contained"
                color="primary"
                sx={{
                    color: theme.palette.customColors.white,
                    fontSize: theme.typography.body1,
                    borderRadius: theme.customShape.btn,
                    px: 3,
                    textTransform: "none",
                }}
            >
                Add Earner
            </Button>
            <ModalContainer
                setHasEarner={setHasEarner}
                open={open}
                onClose={() => setOpen(false)}
                title="Select Earners"
                options={emailOptions}
                onGetEmail={onGetEmail}
                control={control}
                badgeId={badgeId || ""}
                emails={email?.data || []}
            />
        </>
        // End Add Earner Button
    );
};

export default IssuerBadgeButton;
