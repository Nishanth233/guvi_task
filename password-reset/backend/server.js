const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();
connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bright-churros-e4c644.netlify.app",
    ],
  })
);
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Password Reset Project API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
