// React library import
import { useEffect, useState } from "react";

// MUI import
import { Grid, Stack } from "@mui/material";

// Custom Import
import ProfileHeader from "./ProfileHeader";
import BioContent from "../BioContent";
import ProfileInfoContainer from "./ProfileInfo";
import AlertMessage from "../../../components/alert/AlertMessage";

// =========== Start UserProfile ===========
const UserProfile = () => {
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    // Function to handle success message and alert state
    const handleEditSuccess = (msg, success) => {
        setMessage(msg);
        setIsSuccess(success);
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <Stack>
            {message && <AlertMessage variant={isSuccess ? "success" : "error"}>{message}</AlertMessage>}

            <Stack gap={3}>
                <Grid container spacing={3}>
                    {/* Profile Header and Bio Content in the same parent */}
                    <Grid item xss={12} md={4} sx={{ display: "flex", flexDirection: "column" }}>
                        <Stack spacing={3} direction="column">
                            <ProfileHeader onEditSuccess={handleEditSuccess} />
                            <BioContent />
                        </Stack>
                    </Grid>

                    {/* Profile Info on the right side */}
                    <Grid item xss={12} md={8} sx={{ height: "100%" }}>
                        <Stack>
                            <ProfileInfoContainer />
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    );
};

export default UserProfile;
// =========== End UserProfile ===========
