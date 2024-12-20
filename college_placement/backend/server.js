const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

dotenv.config();

connectDB();

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Define the root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes); // Make sure this matches the route in your frontend

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
