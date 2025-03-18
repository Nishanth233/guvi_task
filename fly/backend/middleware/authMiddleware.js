const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error("[ERROR] Authorization header is missing.");
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.error("[ERROR] No token provided.");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the decoded token contains a user
    if (!decoded || !decoded.user) {
      console.error("[ERROR] Invalid token structure.");
      return res.status(401).json({ message: "Invalid token structure" });
    }

    req.user = decoded.user;
    console.log("[INFO] User authenticated:", req.user);
    next();
  } catch (err) {
    console.error("[ERROR] Token verification failed:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
