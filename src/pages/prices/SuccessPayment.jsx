import { Box, Typography, Button, Paper, Divider } from "@mui/material";
import theme from "../../assets/themes";
import { CheckCircleRounded, ChevronLeft } from "@mui/icons-material";
import { Stack } from "@mui/system";

const SuccessPayment = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
            <Paper
                elevation={3}
                sx={{
                    padding: "32px",
                    textAlign: "center",
                    maxWidth: 500,
                    borderRadius: "20px",
                    boxShadow: theme.customShadows.default,
                    m: 3,
                    backgroundColor: 'white'
                }}
            >
                {/* Success Icon */}
                <Box
                    sx={{
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#E5F4ED",
                        borderRadius: "50%",
                        padding: "16px",
                        mb: 2,
                    }}
                >
                    <CheckCircleRounded sx={{ fontSize: 48, color: "#24A26D" }} />
                </Box>

                {/* Title */}
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                    Payment Successful
                </Typography>

                {/* Success message */}
                <Typography color="textSecondary" mb={2}>
                    Your payment was processed successfully. Thank you for your purchase!
                </Typography>

                {/* <Divider sx={{ borderStyle: "dashed", my: 3 }} />

                <Stack textAlign="left" justifyContent="center">
                    <Typography color="textSecondary" mb={1} textAlign="center">
                        Total Amount
                    </Typography>
                    <Typography variant="h2" textAlign="center" fontWeight={theme.fontWeight.bold} gutterBottom>
                        $ 99.99
                    </Typography>

                    <Stack justifyContent="start" alignItems="start">
                        <Typography variant="body2" fontWeight="bold">
                            Order Number:
                        </Typography>
                        <Typography variant="body2" mb={1}>
                            #12345
                        </Typography>

                        <Typography variant="body2" fontWeight="bold">
                            Payment Date:
                        </Typography>
                        <Typography variant="body2"  mb={1}>May 28, 2024</Typography>

                        <Typography variant="body2" fontWeight="bold">
                            Sender Name:
                        </Typography>
                        <Typography variant="body2">Sreang Lyhour</Typography>
                    </Stack>
                </Stack>

                <Divider sx={{ borderStyle: "dashed", my: 3 }} /> */}

                {/* =================================== */}

                <Divider sx={{ borderStyle: "dashed", my: 3 }} />

                <Box
                    display="flex"
                    flexDirection={{ xs: "row", xss: "column" }}
                    alignItems="start"
                    justifyContent="space-between"
                    marginBottom={2}
                >
                    <Typography variant="body1" color="textSecondary">
                        Date
                    </Typography>
                    <Typography variant="body1">Mar 22, 2023</Typography>
                </Box>
                <Box
                    display="flex"
                    alignItems="start"
                    flexDirection={{ xs: "row", xss: "column" }}
                    justifyContent="space-between"
                    marginBottom={2}
                >
                    <Typography variant="body1" color="textSecondary">
                        Types
                    </Typography>
                    <Typography variant="body1">Annual Advantage</Typography>
                </Box>
                <Box
                    display="flex"
                    alignItems="start"
                    flexDirection={{ xs: "row", xss: "column" }}
                    justifyContent="space-between"
                    marginBottom={2}
                >
                    <Typography variant="body1" color="textSecondary">
                        Payment Method
                    </Typography>
                    <Typography variant="body1">Card</Typography>
                </Box>

                <Divider sx={{ borderStyle: "dashed", my: 3 }} />

                <Box
                    display="flex"
                    alignItems="start"
                    flexDirection={{ xs: "row", xss: "column" }}
                    justifyContent="space-between"
                    marginBottom={2}
                >
                    <Typography variant="body1" color="textSecondary">
                        Total Amount
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                        $ 999.99
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: "dashed", my: 3 }} />

                {/* =================================== */}

                {/* View Order Details button */}
                <Button
                    // variant="outlined"
                    fullWidth
                    startIcon={<ChevronLeft />}
                    sx={{
                        mt: 2,
                        backgroundColor: theme.palette.action.hover,
                        color: theme.palette.primary.main,
                        fontWeight: theme.fontWeight.bold,
                        textTransform: "none",
                        "&:hover": { backgroundColor: theme.palette.action.selected },
                    }}
                >
                    Back to RatifyME
                </Button>
            </Paper>
        </Box>
    );
};

export default SuccessPayment;
