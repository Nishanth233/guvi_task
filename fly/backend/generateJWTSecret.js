const crypto = require("crypto");

const generateJWTSecret = (length = 64) => {
  return crypto.randomBytes(length).toString("hex");
};

const jwtSecret = generateJWTSecret();
console.log(`Your JWT Secret Key: ${jwtSecret}`);
