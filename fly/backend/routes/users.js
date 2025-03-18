const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      console.error("[ERROR] Invalid file type:", file.mimetype);
      return cb(new Error("Invalid file type. Only JPEG and PNG are allowed."));
    }
    cb(null, true);
  },
});

// Middleware to verify the token
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.error("[ERROR] Authorization header is missing.");
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("[INFO] User authenticated:", req.user);
    next();
  } catch (error) {
    console.error("[ERROR] Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// User registration
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: "User registered successfully", user: newUser });
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    console.error("[ERROR] Invalid credentials for email:", email);
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  const { password: _, ...userWithoutPassword } = user.toObject();

  res.json({ token, user: userWithoutPassword });
});

// Fetch user profile
router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

// Update user profile
router.put(
  "/me",
  authMiddleware,
  upload.single("profilePicture"),
  async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.file) {
      user.profilePicture = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    // Update user fields
    Object.assign(user, req.body);
    await user.save();
    res.json({
      message: "User profile updated successfully",
      user,
    });
  }
);

module.exports = router;
