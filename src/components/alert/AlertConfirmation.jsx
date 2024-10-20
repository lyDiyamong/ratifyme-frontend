import { useState } from "react"; // Import useState
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import theme from "../../assets/themes";
import { SpinLoading } from "../../components/loading/SpinLoading"; // Import SpinLoading

const AlertConfirmation = ({
    open,
    title,
    message,
    onClose,
    onConfirm,
    icon: Icon = ErrorOutline,
    iconColor,
    cancelText,
    confirmText,
    dialogWidth = "450px",
    confirmButtonColor = theme.palette.primary.main,
    confirmButtonColorHover,
    iconBgColor = theme.palette.primary.light,
    showIcon = true,
}) => {
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        try {
            await onConfirm();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="dialog-title"
            sx={{
                "& .MuiDialog-paper": {
                    width: dialogWidth,
                    px: 1,
                    py: 2,
                    borderRadius: theme?.customShape?.card || "8px",
                    backgroundColor: "#f9f9f9",
                },
            }}
        >
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {showIcon && (
                    <Box
                        component="div"
                        width={70}
                        height={70}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: iconBgColor,
                            borderRadius: theme?.customShape.btn,
                        }}
                    >
                        {Icon && <Icon sx={{ fontSize: 32, color: iconColor }} />}
                    </Box>
                )}
                <DialogTitle
                    id="dialog-title"
                    sx={{
                        fontSize: "1.3rem",
                        fontWeight: theme?.fontWeight?.semiBold || 600,
                        color: "#333",
                        textAlign: "center",
                    }}
                >
                    {title}
                </DialogTitle>
                <DialogContentText
                    sx={{
                        fontSize: "1rem",
                        color: "#666",
                        marginBottom: 1,
                        textAlign: "center",
                    }}
                >
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: "center",
                }}
            >
                {cancelText && (
                    <Button
                        onClick={onClose}
                        sx={{
                            color: theme.palette.customColors.gray500,
                            backgroundColor: theme.palette.customColors.gray100,
                            borderColor: theme.palette.customColors.gray500,
                            textTransform: "none",
                            padding: "8px 32px",
                            borderRadius: theme?.customShape?.btn || "8px",
                            ":hover": {
                                backgroundColor: "#f0f0f0",
                            },
                        }}
                    >
                        {cancelText}
                    </Button>
                )}
                {confirmText && (
                    <Button
                        onClick={handleConfirm}
                        disabled={loading} 
                        sx={{
                            color: "#fff",
                            backgroundColor: confirmButtonColor,
                            textTransform: "none",
                            padding: "8px 32px",
                            borderRadius: theme?.customShape?.btn || "8px",
                            ":hover": {
                                backgroundColor: confirmButtonColorHover,
                            },
                        }}
                    >
                        {/* Show loading spinner or text based on loading state */}
                        {loading ? (
                            <SpinLoading size={24} color="#fff" />
                        ) : (
                            confirmText
                        )}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default AlertConfirmation;
