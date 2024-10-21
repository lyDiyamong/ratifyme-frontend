// React import
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

// Mui import
import { Button } from "@mui/material";

// Custom import
import { SpinLoading } from "../../components/loading/SpinLoading";
import theme from "../../assets/themes";

// Api import

// Public key from Stripe
const stripePromise = loadStripe(String(import.meta.env.VITE_STRIPE_PUBLIC_KEY));

/**
 *
 * @param {Number} id  : id of the servicePlan
 * @return {JSX.Element} : Checkout button for stripe only
 */
const CheckoutButton = ({ id }) => {
    const { institutionData, userId } = useSelector((state) => state.global);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle redirecting
    const handleClick = async (id) => {
        setLoading(true);

        try {
            // Redirect to signup when there's no user
            if (!institutionData.id) return navigate("/signup?as=institution");

            // Create a Checkout Session
            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/subscriptions/subscribe/${id}`, {
                userId,
            });

            // Get the session id for checking out
            const { sessionId } = await response.data;

            const stripe = await stripePromise;
            // Redirect to the checkout session page
            const { error } = await stripe.redirectToCheckout({ sessionId });

            if (error) {
                console.error("Can't redirecting to checkout session page");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            role="link"
            onClick={() => handleClick(id)}
            fullWidth
            sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.customColors.white,
                fontSize: theme.typography.body1,
                fontWeight: theme.fontWeight.semiBold,
                borderRadius: theme.customShape.btn,
            }}
        >
            {loading ? <SpinLoading color={theme.palette.customColors.white} size={24} /> : "Subscribe"}
        </Button>
    );
};

export default CheckoutButton;
