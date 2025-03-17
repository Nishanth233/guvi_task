require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Amadeus = require("amadeus");
const path = require("path");

// Import routes
const flightRoutes = require("./routes/flights");
const bookingRoutes = require("./routes/bookings");
const userRoutes = require("./routes/users");
const airportRoutes = require("./routes/airports");
const reportRoutes = require("./routes/reports");
const cheapestFaresRoutes = require("./routes/cheapestFares");
const destinationsRouter = require("./routes/destinations");
const paymentRoutes = require("./routes/payment");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://heartfelt-entremet-0b689b.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("[INFO] MongoDB connected"))
  .catch((err) => console.error("[ERROR] MongoDB connection failed:", err));

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Stripe payment route
app.post("/api/payment", async (req, res) => {
  const { amount, currency } = req.body;
  try {
    console.log(`[INFO] Initiating payment: Amount - ${amount}, Currency - ${currency}`);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("[ERROR] Failed to create PaymentIntent:", error.message);
    res.status(500).json({ error: "Payment processing failed." });
  }
});

// Nodemailer email route
app.post("/api/send-email", async (req, res) => {
  const { to, subject, text } = req.body;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };
  try {
    console.log(`[INFO] Sending email to ${to}`);
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("[ERROR] Failed to send email:", error.message);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// Amadeus API setup
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

// Define routes
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/airports", airportRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/cheapest-fares", cheapestFaresRoutes);
app.use("/api/destinations", destinationsRouter);
app.use("/api", paymentRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Flight Management System!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("[ERROR]", err.stack);
  res.status(500).json({ error: "Something went wrong.", details: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[INFO] Server running on port ${PORT}`));
