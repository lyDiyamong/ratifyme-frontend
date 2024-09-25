// React import
import { cloneElement, useState } from "react";

// MUI import
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

// Custom import
import theme from "../assets/themes";

/**
 * MakeSureModal Component
 *
 * A modal dialog that prompts the user for confirmation before proceeding with an action.
 * It includes customizable buttons and can execute a function when the user agrees.
 *
 * @param {String} openBtn - The content of the button that opens the modal.
 * @param {Object} openBtnSx- Custom styles for the open button.
 * @param {string} title - The title of the modal.
 * @param {string} message - The message displayed in the modal.
 * @param {JSX.Element} agreeBtn - A custom button to confirm the action; if not provided, a default button is used.
 * @param {function} onAgree - A callback function to execute when the user confirms their action.
 *
 * How to use
 * <MakeSureModal
    title="Issue badge to your earners?"
    message="Are you sure you want to issue this badge to the recipients? Preview the badge details before issuing it."
    agreeBtn={<Button>Submit</Button>}
    onAgree={() => console.log("Submit action triggered")}
/>
 */
export default function MakeSureModal({ openBtn, icon, variant, openBtnSx, title, message, agreeBtn, onAgree }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleAgree = () => {
        if (onAgree) {
            onAgree();
        }
        handleClose();
    };

    return (
        <>
            {/* Open modal button */}
            <Button
                startIcon={icon}
                variant={variant}
                onClick={handleClickOpen}
                sx={{ borderRadius: theme.customShape.btn, color: theme.palette.customColors.white, ...openBtnSx }}
            >
                {openBtn}
            </Button>
            {/* Start MakeSureModal */}
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                {/* Modal title */}
                <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
                {/* Modal message */}
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                </DialogContent>
                {/* Modal action button */}
                <DialogActions>
                    {/* Cancel closing button */}
                    <Button
                        variant="text"
                        sx={{
                            borderRadius: theme.customShape.btn,
                            color: theme.palette.text.primary
                        }}
                        onClick={handleClose}
                    >
                        Cancel
                        {/* Agree Button */}
                    </Button>
                    {agreeBtn ? (
                        // Ensures that your custom button (agreeBtn) gets the handleAgree function attached to its onClick event
                        cloneElement(agreeBtn, { onClick: handleAgree })
                    ) : (
                        <Button onClick={handleAgree}>Agree</Button>
                    )}
                </DialogActions>
            </Dialog>
            {/* End MakeSureModal */}
        </>
    );
}
