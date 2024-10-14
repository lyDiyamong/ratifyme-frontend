// React Import
import { useState } from "react";

// MUI Import
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Paper, Box } from "@mui/material";
import theme from "../../assets/themes/index";

// Custom Import
import SelectForm from "../SelectionForm";
import { useSendBadgeMutation } from "../../store/api/achievements/achievementApi";
import { useFetchEarnerQuery } from "../../store/api/earnerManagement/earnerApis";

const CustomPaper = (props) => <Paper {...props} sx={{ borderRadius: "16px" }} />;

const ModalContainer = ({ open, onClose, title, options, control, onGetEmail, badgeId }) => {
    const [sendBadge] = useSendBadgeMutation();
    const { data: earner } = useFetchEarnerQuery();

    const [list, setList] = useState([]);

    const earnerIds =
        earner?.data?.filter((earner) => list.includes(earner.User.email))?.map((earner) => earner.id) || [];
    
    console.log(earnerIds, badgeId)
    // Handle option selection and add to the list
    const handleSelect = (selectedOption) => {
        const selectedEmail = fetchOptions.find((option) => option.value === selectedOption)?.label;

        // Check if the selected email is already in the list to avoid duplicates
        if (selectedEmail && !list.includes(selectedEmail)) {
            setList((prevList) => [...prevList, selectedEmail]);
        }
    };

    const handleSave = async () => {
        if (earnerIds.length > 0) {
            try {
                const result = { id: badgeId, earners: earnerIds };
                await sendBadge(result).unwrap();
                console.log("Badge successfully issued");
            } catch (error) {
                console.error("Error issuing badge:", error);
            }
        }
        onGetEmail(list);
        console.log(list);
        onClose();
    };
    const fetchOptions = options?.map((element) => ({ value: element.id, label: element.email })) || [];

    return (
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
    );
};

export default ModalContainer;
