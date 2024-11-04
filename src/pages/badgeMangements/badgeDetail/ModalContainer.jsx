// Reacl library import
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// MUI import
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Paper, Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

// Custom import
import { SpinLoading } from "../../../components/loading/SpinLoading";
import AlertMessage from "../../../components/alert/AlertMessage";
import PageLoading from "../../../components/loading/PageLoading";
import SelectForm from "../../../components/SelectionForm";
import useCatchStatus from "../../../hooks/useCatchStatus";
import theme from "../../../assets/themes";

// API import
import { useSendBadgeMutation } from "../../../store/api/achievements/achievementApi";
import { useFetchEarnerQuery } from "../../../store/api/earnerManagement/earnerApis";

const CustomPaper = (props) => <Paper {...props} sx={{ borderRadius: "16px" }} />;

const ModalContainer = ({ open, onClose, title, options, control, onGetEmail, badgeId, emails, setHasEarner }) => {
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [selectedValue, setSelectedValue] = useState(null); 
    const [list, setList] = useState([]);

    const { issuerData } = useSelector((state) => state.global);
    const [sendBadge, { isLoading, isSuccess }] = useSendBadgeMutation();
    const { data: earner, refetch } = useFetchEarnerQuery({ issuerId: issuerData?.id });

    // Set message only if isSuccess is true after refetch or sendBadge
    const [message, setMessage] = useCatchStatus(isSuccess, isSuccess ? successMsg : "Earner added to list has failed");

    // Watch isSuccess for alert message changes
    useEffect(() => {
        if (isSuccess) {
            setMessage("Earners added to list successfully.");
        }
    }, [isSuccess, refetch]);

    const earnerIds = earner?.data?.filter((earner) => list.includes(earner.User.email))?.map((earner) => earner.id) || [];

    const handleSelect = (selectedOption) => {
        const selectedEmail = availableOptions.find((option) => option.value === selectedOption)?.label;

        if (selectedEmail && selectedEmail !== "No earner data available" && !list.includes(selectedEmail)) {
            setList((prevList) => [...prevList, selectedEmail]);
            setSelectedValue(selectedOption);
        }
    };

    const removeEarner = (emailToRemove) => {
        setList((prevList) => {
            const updatedList = prevList.filter((email) => email !== emailToRemove);

            if (updatedList.length === 0) {
                setSelectedValue(null);
            }

            return updatedList;
        });

        const removedValue = availableOptions.find((option) => option.label === emailToRemove)?.value;
        if (selectedValue === removedValue) {
            setSelectedValue(null);
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
                setHasEarner(null);
                window.location.reload();
            } catch (error) {
                console.error("Error issuing badge:", error);
            } finally {
                setLoading(false);
            }
        }
        onGetEmail(() => list);
        onClose();
    };

    const fetchOptions = options?.map((element) => ({ value: element.id, label: element.email })) || [];

    const availableOptions = fetchOptions.filter(
        (option) => !list.includes(option.label) && !emails.some((earner) => earner.Earner.User.email === option.label),
    );

    if (availableOptions.length === 0) {
        availableOptions.push({
            value: "",
            label: "No earner data available",
            disabled: true,
        });
    }

    return (
        <>
            <PageLoading isLoading={isLoading} />

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
                            options={availableOptions}
                            required={false}
                            onChange={handleSelect}
                            value={selectedValue}
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
