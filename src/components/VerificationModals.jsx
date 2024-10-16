// React Library
import React, { useEffect, useState } from "react";

//MUI Import
import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemText,
    IconButton,
    CircularProgress,
    Typography,
    Divider,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

//Custom Import
import theme from "../assets/themes";

//Fetching Data
import { useFetchVerificationDataQuery } from "../store/api/earnerManagement/verificationApi";

/**
 * A modal component to display verification data.
 *
 * @param {boolean} open - Indicates if the modal is open or closed.
 * @param {function} handleClose - Function to handle closing the modal.
 * @param {string} verificationId - The ID of the verification data to fetch.
 *
 * @returns {JSX.Element} The Verification Modal component.
 *
 * @example
 * const [openModal, setOpenModal] = useState(false);
 * const handleClose = () => setOpenModal(false);
 *
 * <VerificationModal
 *   open={openModal}
 *   handleClose={handleClose}
 *   verificationId="12345"
 * />
 */
//=========== Start Verification Modal ===========
const VerificationModal = ({ open, handleClose, verificationId }) => {
    const { data, error, isLoading } = useFetchVerificationDataQuery(verificationId, {
        skip: !open,
    });

    const [loadingStates, setLoadingStates] = useState({
        issuedOn: false,
        issuedBy: false,
        issuedUsing: false,
        issuedTo: false,
        acceptedOn: false,
        lastUpdated: false,
    });

    const fetchSequentially = async (data) => {
        const keys = ["issuedOn", "issuedBy", "issuedUsing", "issuedTo", "acceptedOn", "lastUpdated"];

        for (const key of keys) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    setLoadingStates((prev) => ({ ...prev, [key]: true }));
                    resolve();
                }, 1000);
            });
        }
    };

    useEffect(() => {
        if (open && data) {
            setLoadingStates({
                issuedOn: false,
                issuedBy: false,
                issuedUsing: false,
                issuedTo: false,
                acceptedOn: false,
                lastUpdated: false,
            });
            fetchSequentially(data);
        }
    }, [open, data]);

    if (isLoading) {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h3" sx={{ fontWeight: theme.fontWeight.bold }}>
                        Verification
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography>Loading...</Typography>
                </DialogContent>
            </Dialog>
        );
    }

    if (error) {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h3" sx={{ fontWeight: theme.fontWeight.bold }}>
                        Verification
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography>Error loading data</Typography>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h3" sx={{ fontWeight: theme.fontWeight.bold }}>
                    Verification
                </Typography>
                <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <List>
                    {data ? (
                        ["issuedOn", "issuedBy", "issuedUsing", "issuedTo", "acceptedOn", "lastUpdated"].map((key) => (
                            <React.Fragment key={key}>
                                <ListItem>
                                    {loadingStates[key] ? (
                                        <CheckIcon color="success" />
                                    ) : (
                                        <CircularProgress size={24} />
                                    )}
                                    <ListItemText
                                        primary={`${key.replace(/([A-Z])/g, " $1")}: ${
                                            loadingStates[key] ? data[key] : "..."
                                        }`}
                                    />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))
                    ) : (
                        <Typography>No verification data available.</Typography>
                    )}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default VerificationModal;
//=========== End Verification Modal ===========
