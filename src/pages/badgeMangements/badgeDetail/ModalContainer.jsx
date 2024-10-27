import { useState } from "react";
import { useSelector } from "react-redux";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Paper, Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import theme from "../../../assets/themes";
import SelectForm from "../../../components/SelectionForm";
import { useSendBadgeMutation } from "../../../store/api/achievements/achievementApi";
import { useFetchEarnerQuery } from "../../../store/api/earnerManagement/earnerApis";
import { SpinLoading } from "../../../components/loading/SpinLoading";
import AlertMessage from "../../../components/alert/AlertMessage";
import useCatchStatus from "../../../hooks/useCatchStatus";

const CustomPaper = (props) => <Paper {...props} sx={{ borderRadius: "16px" }} />;

const ModalContainer = ({ open, onClose, title, options, control, onGetEmail, badgeId, emails, setHasEarner }) => {
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [selectedValue, setSelectedValue] = useState(null); // Controlled value for the SelectForm
    const [list, setList] = useState([]); // List of selected emails

    const { issuerData } = useSelector((state) => state.global);
    const [sendBadge, { isSuccess, refetch }] = useSendBadgeMutation();
    const { data: earner } = useFetchEarnerQuery({ issuerId: issuerData?.id });

    const [message, setMessage] = useCatchStatus(isSuccess, isSuccess ? successMsg : "Earner added to list has failed");

    const earnerIds = earner?.data?.filter((earner) => list.includes(earner.User.email))?.map((earner) => earner.id) || [];

    // Function to handle selection from the dropdown
    const handleSelect = (selectedOption) => {
        const selectedEmail = availableOptions.find((option) => option.value === selectedOption)?.label;

        // Check if the selected email is not already in the list to avoid duplicates
        // Also check if the selected email is not the "No earner data available" option
        if (selectedEmail && selectedEmail !== "No earner data available" && !list.includes(selectedEmail)) {
            setList((prevList) => [...prevList, selectedEmail]); // Add to selected list
            setSelectedValue(selectedOption); // Update the selected value in SelectForm
        }
    };

    // Function to remove an email from the selected list
    const removeEarner = (emailToRemove) => {
        // Remove email from the list
        setList((prevList) => {
            const updatedList = prevList.filter((email) => email !== emailToRemove);

            // If the updated list is empty, reset the selected value
            if (updatedList.length === 0) {
                setSelectedValue(null);
            }

            return updatedList;
        });

        // If the removed email matches the selectedValue in SelectForm, reset it
        const removedValue = availableOptions.find((option) => option.label === emailToRemove)?.value;
        if (selectedValue === removedValue) {
            setSelectedValue(null); // Clear the SelectForm's value
        }
    };

    const handleSave = async () => {
        if (earnerIds.length > 0) {
            try {
                setLoading(true);
                const result = { id: badgeId, earners: earnerIds };
                await sendBadge(result).unwrap();
                refetch();
                setSuccessMsg("Earners added to list successfully.");
                setHasEarner(null)
            } catch (error) {
                console.error("Error issuing badge:", error);
            } finally {
                setLoading(false);
            }
        }
        onGetEmail(() => list);
        onClose();
    };

    // Mapping the options for the SelectForm dropdown
    const fetchOptions = options?.map((element) => ({ value: element.id, label: element.email })) || [];

    // Filter out selected emails and invited emails from the options
    const availableOptions = fetchOptions.filter(
        (option) => !list.includes(option.label) && !emails.some((earner) => earner.Earner.User.email === option.label),
    );

    // Check if availableOptions is empty and add a custom message if so
    if (availableOptions.length === 0) {
        availableOptions.push({
            value: "", // Set an empty value or a unique identifier
            label: "No earner data available",
            disabled: true, // Disable the option to prevent selection
        });
    }

    // Display the selected emails
    return (
        <>
            {message && <AlertMessage variant={isSuccess ? "success" : "error"}>{message}</AlertMessage>}
            <Dialog
                open={open}
                onClose={onClose}
                PaperComponent={CustomPaper}
                sx={{ noValidate: true, height: "auto", Height: "800px" }}
                component="form"
            >
                <DialogTitle sx={{ padding: "20px", fontSize: theme.typography.h4, fontWeight: theme.fontWeight.semiBold }}>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            mt: 2,
                            width: { xs: "280px", sm: "420px", md: "500px" },
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "16px",
                        }}
                    >
                        <SelectForm
                            name="email"
                            label="Email"
                            control={control}
                            options={availableOptions} // Use available options based on selected and invited emails
                            required={false}
                            onChange={handleSelect}
                            value={selectedValue} // Control the select value
                        />

                        <Box>
                            <Typography variant="h6">Selected Emails:</Typography>
                            <Box
                                sx={{
                                    height: "200px",
                                    overflowY: "auto",
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                    borderRadius: "8px",
                                }}
                            >
                                {/* Display the selected emails with a remove option */}
                                {list.map((item, index) => (
                                    <Box
                                        key={index}
                                        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}
                                    >
                                        <Typography>{item}</Typography>
                                        <IconButton
                                            onClick={() => removeEarner(item)}
                                            size="small"
                                            sx={{ color: theme.palette.customColors.gray500 }}
                                        >
                                            <Close fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ))}
                                {/* Show invited emails */}
                                {emails
                                    .filter((earner) => !list.includes(earner.Earner.User.email))
                                    .map((earner) => (
                                        <Box
                                            key={earner.Earner.User.id}
                                            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                                        >
                                            {earner.Earner.User.email}{" "}
                                            <Typography sx={{ color: theme.palette.customColors.gray500 }}>Invited</Typography>
                                        </Box>
                                    ))}
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ pb: "20px" }}>
                    <Button onClick={onClose} sx={{ textTransform: "none" }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        disabled={loading}
                        sx={{
                            color: theme.palette.customColors.white,
                            borderRadius: theme.customShape.btn,
                            textTransform: "none",
                        }}
                    >
                        {loading ? <SpinLoading size={24} /> : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModalContainer;
