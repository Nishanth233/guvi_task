export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  if (token) {
    try {
      // Decode the token payload manually
      const base64Url = token.split(".")[1]; // Get the payload part of the JWT
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const decodedToken = JSON.parse(jsonPayload); // Parse the JSON payload

      console.log("[DEBUG] Decoded token:", decodedToken); // Debug log the token

      // Adjust the return value based on your token structure
      return decodedToken.user?.id || decodedToken.id || null; // Access user.id or id if directly available
    } catch (error) {
      console.error("[ERROR] Failed to decode token:", error.message);
      return null; // Return null if decoding fails
    }
  }
  return null; // Return null if no token is found
};
