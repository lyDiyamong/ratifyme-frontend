// MUI import
import { Box, Typography, DialogContent, IconButton, DialogTitle, Dialog, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Error } from "@mui/icons-material";

// Custom import
import theme from "../assets/themes";

const VerificationFailureModal = ({ open, handleClose, message }) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: theme.fontWeight.bold }}>
                    Verification Failed
                </Typography>

                <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon sx={{ color: theme.palette.customColors.gray300 }} />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack gap={2}>
                    <Stack
                        flexDirection="row"
                        sx={{
                            borderRadius: "8px",
                            minHeight: 80,
                            alignItems: "center",
                            gap: 2,
                            p: 1,
                            textDecoration: "none",
                            backgroundColor: theme.palette.customColors.red100,
                        }}
                    >
                        <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderTopLeftRadius: "8px",
                                borderBottomLeftRadius: "8px",
                            }}
                        >
                            <Error sx={{ m: 1, width: 30, height: 30, color: theme.palette.customColors.red400 }} />
                        </Box>
                        <Stack>
                            <Typography variant="body1" fontWeight={theme.fontWeight.semiBold} color={theme.palette.text.primary}>
                                {message}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                            Digital credential is no longer valid.
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack spacing={1}>
                        <Typography variant="body2" color={theme.palette.text.secondary}>
                            Due to a failed verification, this credential cannot be used as a recognized proof of qualification or
                            achievement. Verification failure may occur if the credential has expired, been revoked. As such, it is not eligible for official or professional use.
                        </Typography>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default VerificationFailureModal;
