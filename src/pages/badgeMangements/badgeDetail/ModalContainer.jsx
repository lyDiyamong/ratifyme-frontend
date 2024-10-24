// React Import
import { useState } from "react";
import { useSelector } from "react-redux";

// MUI Import
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Paper, Box } from "@mui/material";
import theme from "../../../assets/themes/index";

// Custom Import
import SelectForm from "../../../components/SelectionForm";
import { useSendBadgeMutation } from "../../../store/api/achievements/achievementApi";
import { useFetchEarnerQuery } from "../../../store/api/earnerManagement/earnerApis";
import useCatchStatus from "../../../hooks/useCatchStatus";
import AlertMessage from "../../../components/alert/AlertMessage";

const CustomPaper = (props) => <Paper {...props} sx={{ borderRadius: "16px" }} />;

const ModalContainer = ({ open, onClose, title, options, control, onGetEmail, badgeId }) => {
    // List state
    const [list, setList] = useState([]);
    // Global slice state
    const { issuerData } = useSelector((state) => state.global);
    // Send Badge hook
    const [sendBadge, { isSuccess, isLoading }] = useSendBadgeMutation();
    // Fetch Earner hook
    const { data: earner } = useFetchEarnerQuery({ issuerId: issuerData?.id });
    const earnerIds = earner?.data?.filter((earner) => list.includes(earner.User.email))?.map((earner) => earner.id) || [];
    // Catch status hook
    const [message, setMessage] = useCatchStatus(isSuccess, isSuccess ? "Added earner to badge successfully" : "Add earner failed");

    // Handle option selection and add to the list
    const handleSelect = (selectedOption) => {
        const selectedEmail = fetchOptions.find((option) => option.value === selectedOption)?.label;

        // Check if the selected email is already in the list to avoid duplicates
        if (selectedEmail && !list.includes(selectedEmail)) {
            setList((prevList) => [...prevList, selectedEmail]);
        }
    };

    // Save Handing
    const handleSave = async () => {
        if (earnerIds.length > 0) {
            try {
                // Construct the data to send
                const result = { id: badgeId, earners: earnerIds };

                // Attempt to send the badge
                await sendBadge(result).unwrap();

                // Set success message using useCatchStatus
                setMessage("Added earner to badge successfully");
            } catch (error) {
                // Set error message using useCatchStatus
                setMessage("Error issuing badge: ");
            } finally {
                // Close the modal regardless of success or error
                onClose();
            }
        } else {
            setMessage("No earners selected.");
        }

        // Pass selected emails to parent component (onGetEmail callback)
        onGetEmail(list);
    };

    const fetchOptions = options?.map((element) => ({ value: element.id, label: element.email })) || [];

    return (
        <>
            {message && (
                <AlertMessage variant={isSuccess ? "success" : "error"} onClose={() => setMessage("")}>
                    {message}
                </AlertMessage>
            )}
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
                            options={fetchOptions}
                            required={false}
                            onChange={handleSelect}
                        />
                        <Box>
                            <h4>Selected Emails:</h4>
                            <Box
                                sx={{
                                    height: "200px",
                                    overflowY: "auto",
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                    borderRadius: "8px",
                                }}
                            >
                                {list.map((item, index) => (
                                    <Box key={index} sx={{ py: 1 }}>
                                        {item}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ pb: "20px" }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        sx={{ color: theme.palette.customColors.white, borderRadius: theme.customShape.btn }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModalContainer;
