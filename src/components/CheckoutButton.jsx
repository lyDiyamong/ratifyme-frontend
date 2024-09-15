// CheckoutButton.js (Frontend)
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import theme from "../assets/themes";
import axios from "axios";

// Public key from Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

/**
 *
 * @param {*} { id } : id of the servicePlan
 * @return {*}
 */
const CheckoutButton = ({ id }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async (id) => {
        setLoading(true);

        try {
            // Create a Checkout Session
            const response = await axios.post(`${import.meta.env.VITE_BASE_API}/subscriptions/subscribe/${id}`, {
                servicePlanId: id,
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
            {loading ? (
                <CircularProgress size={theme.typography.h3} color={theme.palette.customColors.white} />
            ) : (
                "Subscribe"
            )}
        </Button>
    );
};

export default CheckoutButton;
