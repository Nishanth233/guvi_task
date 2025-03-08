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
    res.status(500).json({ error: error.message });
  }
});

// Route to handle digital wallet payments
router.post("/digital-wallet-payment", authMiddleware, async (req, res) => {
  const { user, flight, amount, walletDetails } = req.body;
  try {
    // Process digital wallet payment
    // Placeholder for digital wallet integration
    res.json({ paymentIntent: { status: "succeeded" } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to handle bank transfers
router.post("/bank-transfer", authMiddleware, async (req, res) => {
  const { user, flight, amount, accountNumber, bankName } = req.body;
  try {
    // Process bank transfer payment
    // Placeholder for bank transfer integration
    res.json({ paymentIntent: { status: "succeeded" } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
