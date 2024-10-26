import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
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
import theme from "../../assets/themes";
import { useGetServicePlanQuery } from "../../store/api/subscription/subscriptionApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import PageLoading from "../../components/loading/PageLoading";
import { SpinLoading } from "../loading/SpinLoading";

// Public key from Stripe
const stripePromise = loadStripe(String(import.meta.env.VITE_STRIPE_PUBLIC_KEY));
// Static plans data with placeholders for dynamic prices
// Dynamically map plans with IDs and prices from the backend
const plans = (monthlyPlans, annualPlans) => {
    return [
        {
            monthlyId: monthlyPlans?.find((plan) => plan.name === "Standard")?.id,
            anualId: annualPlans?.find((plan) => plan.name === "Standard")?.id,
            label: "Standard",
            priceMonthly: monthlyPlans?.find((plan) => plan.name === "Standard")?.price || "0.00",
            priceAnnually: annualPlans?.find((plan) => plan.name === "Standard")?.price || "0.00",
            description: "Begin your credentialing journey with a reliable solution and essential tools.",
            issuingLimits: [250],
            features: [
                "Templates library",
                "Mass issuing & delivery (limited)",
                "PDF certificate export",
                "Social media sharing (LinkedIn, Facebook)",
                "Verifiable certificates/badges",
            ],
            buttonLabel: "Start free",
        },
        {
            monthlyId: monthlyPlans?.find((plan) => plan.name === "Professional")?.id,
            anualId: annualPlans?.find((plan) => plan.name === "Professional")?.id,
            label: "Professional",
            priceMonthly: monthlyPlans?.find((plan) => plan.name === "Professional")?.price || "39.99",
            priceAnnually: annualPlans?.find((plan) => plan.name === "Professional")?.price || "299.99",
            description: "For small companies looking for professional branding & data insights.",
            issuingLimits: [1000],
            features: [
                "Branded emails",
                "Scheduled issuing",
                "Expirable credentials",
                "Advanced analytics",
                "Custom email sender",
                "Premium branding (Add-On)",
                "Verified status (Add-On)",
                "Custom domain (Add-On)",
            ],
            buttonLabel: "Explore",
            isPopular: true,
        },
        {
            monthlyId: monthlyPlans?.find((plan) => plan.name === "Premium")?.id,
            anualId: annualPlans?.find((plan) => plan.name === "Premium")?.id,
            label: "Premium",
            priceMonthly: monthlyPlans?.find((plan) => plan.name === "Premium")?.price || "59.99",
            priceAnnually: annualPlans?.find((plan) => plan.name === "Premium")?.price || "499.99",
            description: "For medium and large enterprises requiring advanced customization & tailored approach.",
            issuingLimits: [3000],
            features: [
                "Role-based access",
                "Multiple workspaces",
                "Custom fonts",
                "Premium branding",
                "Custom domain",
                "Verified status",
                "Multiple sender details",
                "Certified recipients directory",
                "Dedicated account manager",
            ],
            buttonLabel: "Go to Advanced",
        },
    ];
};

const ServicePlanCard = () => {
    const { data, isLoading } = useGetServicePlanQuery();
    const [billingCycle, setBillingCycle] = useState("monthly");
    const [activePlan, setActivePlan] = useState(null);
    const [userSelectedPlan, setUserSelectedPlan] = useState(false); // Track if user clicked a plan
    const [loadingPlanId, setLoadingPlanId] = useState(null);

    const monthlyPlans = data?.data?.filter((plan) => plan.duration === 1);
    const annualPlans = data?.data?.filter((plan) => plan.duration === 12);
    const mappedPlans = plans(monthlyPlans, annualPlans);

    const handleBillingCycleChange = (event, newCycle) => {
        if (newCycle !== null) {
            setBillingCycle(newCycle);
            setUserSelectedPlan(false); // Reset user selection when changing billing cycle
        }
    };

    const handleCardClick = (planId) => {
        setActivePlan(planId);
        setUserSelectedPlan(true); // Mark as user-selected when clicked
    };

    useEffect(() => {
        // Set default plan based on billing cycle if the user has not selected a plan
        if (!userSelectedPlan) {
            const defaultPlanId = billingCycle === "monthly" ? mappedPlans[0].monthlyId : mappedPlans[0].anualId;
            setActivePlan(defaultPlanId);
        }
    }, [billingCycle, mappedPlans, userSelectedPlan]);

    const { institutionData, userId } = useSelector((state) => state.global);
    const navigate = useNavigate();

    const handleSubscribe = async (id) => {
        setLoadingPlanId(id);

        try {
            if (!institutionData.id) return navigate("/auth/signup?as=institution");

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
        </Container>
    );
};

export default ServicePlanCard;
