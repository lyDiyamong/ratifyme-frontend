// React library import
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

// MUI import
import {
    Container,
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

// Custom import
import { SpinLoading } from "../loading/SpinLoading";
import { plans } from "../../data/pricePage/servicePlanData";
import PageLoading from "../../components/loading/PageLoading";
import AlertConfirmation from "../../components/alert/AlertConfirmation";
import theme from "../../assets/themes";

// API import
import { useGetServicePlanQuery } from "../../store/api/subscription/subscriptionApi";

// Public key from Stripe
const stripePromise = loadStripe(String(import.meta.env.VITE_STRIPE_PUBLIC_KEY));

const ServicePlanCard = () => {
    const { institutionData, userId, roleId } = useSelector((state) => state.global);
    const navigate = useNavigate();

    const { data, isLoading } = useGetServicePlanQuery();

    const [billingCycle, setBillingCycle] = useState("monthly");
    const [activePlan, setActivePlan] = useState(null);
    const [userSelectedPlan, setUserSelectedPlan] = useState(false);
    const [loadingPlanId, setLoadingPlanId] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const monthlyPlans = data?.data?.filter((plan) => plan.duration === 1);
    const annualPlans = data?.data?.filter((plan) => plan.duration === 12);
    const mappedPlans = plans(monthlyPlans, annualPlans);

    const handleBillingCycleChange = (event, newCycle) => {
        if (newCycle !== null) {
            setBillingCycle(newCycle);
            setUserSelectedPlan(false);
        }
    };

    const handleCardClick = (planId) => {
        setActivePlan(planId);
        setUserSelectedPlan(true);
    };

    useEffect(() => {
        // Set default plan based on billing cycle if the user has not selected a plan
        if (!userSelectedPlan) {
            const defaultPlanId = billingCycle === "monthly" ? mappedPlans[0].monthlyId : mappedPlans[0].anualId;
            setActivePlan(defaultPlanId);
        }
    }, [billingCycle, mappedPlans, userSelectedPlan]);

    const handleSubscribe = async (id) => {
        if (userId && roleId !== 2) {
            setAlertMessage("You are already an earner or issuer. To become an institution, please create a new account.");
            setShowAlert(true);
            return;
        }

        if (!institutionData.id) {
            setAlertMessage("Please create an account before subscribing.");
            setShowAlert(true);
            return;
        }

        setLoadingPlanId(id);

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/subscriptions/subscribe/${id}`, {
                userId,
            });

            const { sessionId } = await response.data;
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoadingPlanId(null);
        }
    };

    const handleAlertConfirm = () => {
        setShowAlert(false);
        if (!institutionData.id) {
            navigate("/auth/signup?as=institution");
        }
    };

    if (isLoading) return <PageLoading isLoading={isLoading} />;

    return (
        <Container sx={{ p: 2 }}>
            <ToggleButtonGroup
                value={billingCycle}
                exclusive
                onChange={handleBillingCycleChange}
                aria-label="billing cycle"
                sx={{
                    my: 4,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <ToggleButton
                    value="monthly"
                    aria-label="monthly"
                    sx={{
                        display: "block",
                        borderRadius: theme.customShape.btn,
                        textTransform: "none",
                        padding: "16px 54px",
                        fontSize: "16px",
                    }}
                >
                    Monthly
                </ToggleButton>
                <ToggleButton
                    value="annually"
                    aria-label="annually"
                    sx={{
                        display: "block",
                        borderRadius: theme.customShape.btn,
                        textTransform: "none",
                        padding: "16px 48px",
                        fontSize: "16px",
                    }}
                >
                    Annually
                </ToggleButton>
            </ToggleButtonGroup>

            <Box sx={{ display: "flex", flexDirection: { xss: "column", lg: "row" }, justifyContent: "space-between", gap: 2 }}>
                {mappedPlans?.map((plan) => {
                    const planId = billingCycle === "monthly" ? plan.monthlyId : plan.anualId;
                    const isActive = activePlan === planId;
                    const isLoading = loadingPlanId === planId;

                    return (
                        <Card
                            key={planId}
                            variant="outlined"
                            onClick={() => handleCardClick(planId)}
                            sx={{
                                width: "100%",
                                backgroundColor: "transparent",
                                padding: "16px",
                                borderRadius: theme.customShape.section,
                                borderColor: isActive ? "#006BFF" : "rgba(0, 0, 0, 0.12)",
                                borderWidth: isActive ? "2px" : "1px",
                                cursor: "pointer",
                                transition: "border-color 0.3s",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h3" sx={{ fontWeight: theme.fontWeight.semiBold }}>
                                    {plan.label}
                                </Typography>
                                <Typography sx={{ color: theme.palette.text.primary, fontSize: "14px", mt: 1, mb: 2 }}>
                                    {plan.description}
                                </Typography>
                                <Typography
                                    variant="h1"
                                    sx={{ fontWeight: theme.fontWeight.bold, my: 3, fontSize: "48px", color: "#021526" }}
                                >
                                    ${billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnually}
                                    <Typography variant="subtitle1" component="span" ml={1}>
                                        {billingCycle === "monthly" ? "/month" : "/year"}
                                    </Typography>
                                </Typography>
                                <Button
                                    onClick={() => handleSubscribe(planId)}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={isLoading}
                                    sx={{
                                        mt: 2,
                                        borderRadius: theme.customShape.btn,
                                        textTransform: "none",
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: { xss: "12px", md: "16px" },
                                        backgroundColor: isActive ? "#006BFF" : "#1976d2",
                                    }}
                                >
                                    {isLoading ? <SpinLoading size="24px" /> : plan.buttonLabel}
                                </Button>
                                <List dense sx={{ mt: 2 }}>
                                    {plan.features.map((feature, idx) => (
                                        <ListItem key={idx}>
                                            <ListItemIcon>
                                                <CheckIcon sx={{ color: "#006BFF", fontSize: "20px" }} />
                                            </ListItemIcon>
                                            <ListItemText primary={feature} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    );
                })}
            </Box>

            <AlertConfirmation
                open={showAlert}
                title="Action Required"
                message={alertMessage}
                onClose={() => setShowAlert(false)}
                onConfirm={handleAlertConfirm}
                confirmText="OK"
                iconColor={theme.palette.customColors.red400}
                iconBgColor={theme.palette.customColors.red100}
            />
        </Container>
    );
};

export default ServicePlanCard;
