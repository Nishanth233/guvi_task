const axios = require("axios");

const sendBookingConfirmation = async (booking) => {
  const emailResponse = await axios.post("/api/send-email", {
    to: booking.user.email,
    subject: "Booking Confirmation",
    text: `Your booking is confirmed. Booking Reference: ${booking._id}`,
  });

  console.log("Email sent:", emailResponse.data);
};

module.exports = sendBookingConfirmation;
