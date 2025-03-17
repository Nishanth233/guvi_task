const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with your secret key
const authMiddleware = require("../middleware/authMiddleware"); // Middleware to verify token

// Route to handle card payments
router.post("/payment", authMiddleware, async (req, res) => {
  const { amount, currency } = req.body;

  try {
    console.log(`[INFO] Received card payment request: Amount - ${amount}, Currency - ${currency}`); // Log request details

    // Process payment using Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    console.log(`[INFO] PaymentIntent created successfully: ID - ${paymentIntent.id}`); // Log successful PaymentIntent creation
    res.json({ clientSecret: paymentIntent.client_secret });

  } catch (error) {
    console.error(`[ERROR] Failed to create PaymentIntent: ${error.message}`, error); // Log error details
    res.status(500).json({ error: "Failed to process payment. Please try again later." });
  }
});

// Route to handle digital wallet payments
router.post("/digital-wallet-payment", authMiddleware, async (req, res) => {
  const { user, flight, amount, walletDetails } = req.body;

  try {
    console.log(`[INFO] Received digital wallet payment request: User - ${user}, Flight - ${flight}, Amount - ${amount}`); // Log request details
    console.log(`[INFO] Wallet Details: ${JSON.stringify(walletDetails)}`); // Log wallet details (ensure no sensitive data)

    // Process digital wallet payment (Placeholder logic)
    console.log(`[INFO] Simulating digital wallet payment success.`);
    res.json({ paymentIntent: { status: "succeeded" } });

  } catch (error) {
    console.error(`[ERROR] Failed to process digital wallet payment: ${error.message}`, error); // Log error details
    res.status(500).json({ error: "Failed to process digital wallet payment. Please try again later." });
  }
});

// Route to handle bank transfers
router.post("/bank-transfer", authMiddleware, async (req, res) => {
  const { user, flight, amount, accountNumber, bankName } = req.body;

  try {
    console.log(`[INFO] Received bank transfer payment request: User - ${user}, Flight - ${flight}, Amount - ${amount}`); // Log request details
    console.log(`[INFO] Bank Details: Account - ${accountNumber}, Bank - ${bankName}`); // Log bank details (ensure no sensitive data)

    // Process bank transfer payment (Placeholder logic)
    console.log(`[INFO] Simulating bank transfer payment success.`);
    res.json({ paymentIntent: { status: "succeeded" } });

  } catch (error) {
    console.error(`[ERROR] Failed to process bank transfer payment: ${error.message}`, error); // Log error details
    res.status(500).json({ error: "Failed to process bank transfer payment. Please try again later." });
  }
});

module.exports = router;
