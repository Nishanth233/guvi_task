export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      const decodedToken = JSON.parse(jsonPayload);
      console.log("[DEBUG] Decoded token:", decodedToken);

      // Return the id directly
      return decodedToken.id || null;
    } catch (err) {
      console.error("[ERROR] Failed to decode token:", err.message);
      return null;
    }
  }
  return null; // Return null if no token exists
};
