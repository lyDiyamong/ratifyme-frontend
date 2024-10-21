import { Box, Typography, Button, Paper, Divider } from "@mui/material";
import theme from "../../assets/themes";
import { CheckCircleRounded, ChevronRight } from "@mui/icons-material";
import { useGetPaymentSuccessQuery } from "../../store/api/subscription/subscriptionApi";
import { useNavigate, useParams } from "react-router";
import FormDate from "../../utils/formatDate";
import PageLoading from "../../components/loading/PageLoading";

const SuccessPayment = () => {
    // Payment Id params hook
    const { paymentId } = useParams();
    // Navigate hook
    const navigate = useNavigate();
    // Payment fetching hook
    const { data: paymentRes, isLoading: paymentLoading } = useGetPaymentSuccessQuery(paymentId);
    const paymentData = paymentRes?.data;

    return (
        // ============= Start Success payment template =============
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
            <PageLoading isLoading={paymentLoading} message="Please wait" />
            <Paper
                elevation={3}
                sx={{
                    padding: "32px",
                    textAlign: "center",
                    maxWidth: 500,
                    borderRadius: "20px",
                    boxShadow: theme.customShadows.default,
                    m: 3,
                    backgroundColor: "white",
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

                <Divider sx={{ borderStyle: "dashed", my: 3 }} />
                {/* Payment date */}
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
                    <Typography variant="body1">{FormDate(paymentData?.paymentDate)}</Typography>
                </Box>
                {/* Service type */}
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
                    <Typography variant="body1">{paymentData?.Subscription?.ServicePlan?.name}</Typography>
                </Box>
                {/* Payment Method */}
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
                    <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
                        {paymentData?.paymentMethod}
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: "dashed", my: 3 }} />
                {/* Payment price */}
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
                        $ {paymentData?.amount}
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: "dashed", my: 3 }} />

                {/* View Order Details button */}
                <Button
                    onClick={() => navigate("/dashboard")}
                    fullWidth
                    endIcon={<ChevronRight />}
                    sx={{
                        mt: 2,
                        backgroundColor: theme.palette.action.hover,
                        color: theme.palette.primary.main,
                        fontWeight: theme.fontWeight.bold,
                        textTransform: "none",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                            backgroundColor: theme.palette.action.selected,
                            transform: "translateY(-3px) scale(1.03)",
                            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                        },
                    }}
                >
                    Go to your Dashboard
                </Button>
            </Paper>
        </Box>
    );
};

export default SuccessPayment;
