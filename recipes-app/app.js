const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Recipes App!");
});

// Routes
app.use("/api", recipeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
