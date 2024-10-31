// React library import
import { useState } from "react";

// MUI import
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Stack } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

// Custom import
import theme from "../../assets/themes";
import { SpinLoading } from "../../components/loading/SpinLoading";

/**
 * AlertConfirmation Component
 *
 * A reusable confirmation dialog that displays a title, message, icon, and customizable buttons for confirming or canceling actions.
 * Ideal for confirming potentially destructive actions like deletions or irreversible operations.
 *
 * @param {boolean} open - Controls the open state of the dialog.
 * @param {string} title - The title text displayed in the dialog.
 * @param {string} message - The main message or description displayed in the dialog.
 * @param {function} onClose - Callback function triggered when the dialog is closed.
 * @param {function} onConfirm - Callback function triggered when the confirm button is clicked.
 * @param {React.ElementType} [icon=ErrorOutline] - Icon component displayed in the dialog header.
 * @param {string} iconColor - Color of the icon.
 * @param {string} cancelText - Label for the cancel button.
 * @param {string} confirmText - Label for the confirm button.
 * @param {string} [dialogWidth="450px"] - Width of the dialog box.
 * @param {string} [confirmButtonColor=theme.palette.primary.main] - Color of the confirm button.
 * @param {string} confirmButtonColorHover - Hover color for the confirm button.
 * @param {string} [iconBgColor=theme.palette.primary.light] - Background color for the icon container.
 * @param {boolean} [showIcon=true] - Whether to show the icon.
 * @param {object} additionalInfo - Additional props to be passed to the Dialog component.
 *
 * @returns {JSX.Element} - Rendered AlertConfirmation component.
 *
 * @example
 * import AlertConfirmation from "./AlertConfirmation";
 * import WarningIcon from "@mui/icons-material/Warning";
 * import { useState } from "react";
 *
 * const MyComponent = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   const handleClose = () => setIsOpen(false);
 *   const handleConfirm = async () => {
 *     console.log("Confirmed action");
 *     setIsOpen(false);
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={() => setIsOpen(true)}>Open Confirmation</button>
 *       <AlertConfirmation
 *         open={isOpen}
 *         title="Delete Item"
 *         message="Are you sure you want to delete this item? This action cannot be undone."
 *         onClose={handleClose}
 *         onConfirm={handleConfirm}
 *         icon={WarningIcon}
 *         iconColor="red"
 *         cancelText="Cancel"
 *         confirmText="Delete"
 *         confirmButtonColor="#D32F2F"
 *         confirmButtonColorHover="#B71C1C"
 *       />
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 */

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
    ...additionalInfo
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
            {...additionalInfo}
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
                <Stack direction='column'>
                    <Stack spacing={2} direction='row'>
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
                                {loading ? <SpinLoading size={24} color="#fff" /> : confirmText}
                            </Button>
                        )}
                    </Stack>

                </Stack>
            </DialogActions>
        </Dialog>
    );
};

export default AlertConfirmation;
