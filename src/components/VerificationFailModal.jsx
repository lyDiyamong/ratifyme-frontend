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
                    {message}
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
                                Invalid Verification
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Credential data does not match
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack spacing={1}>
                        <Typography variant="h5" fontWeight={theme.fontWeight.bold}>
                            Verification Failed Due to the Following Issues:
                        </Typography>

                        <Stack>
                            <Typography variant="body1" sx={{ px: 2 }}>
                                • The claimed date does not match the records.
                            </Typography>
                            <Typography variant="body1" sx={{ px: 2 }}>
                                • The earner's name is invalid or does not match.
                            </Typography>
                            <Typography variant="body1" sx={{ px: 2 }}>
                                • The issuance date is invalid or does not match.
                            </Typography>
                            <Typography variant="body1" sx={{ px: 2 }}>
                                • The issuer's name is invalid or does not
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default VerificationFailureModal;
