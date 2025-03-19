const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with your secret key
const authMiddleware = require("../middleware/authMiddleware"); // Middleware to verify token

// Route to handle card payments
router.post("/payment", authMiddleware, async (req, res) => {
  const { amount, currency } = req.body;

  try {
    // Process payment using Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to process payment. Please try again later." });
  }
});

module.exports = router;
