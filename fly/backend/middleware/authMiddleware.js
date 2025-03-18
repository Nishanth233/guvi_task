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
    req.user = decoded; // Assuming decoded contains the user object
    console.log("[INFO] User authenticated:", req.user);
    next();
  } catch (error) {
    console.error("[ERROR] Token verification failed:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
