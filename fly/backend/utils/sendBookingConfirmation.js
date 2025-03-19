const nodemailer = require("nodemailer");

const sendBookingConfirmation = async (booking) => {
  try {
    // Validate booking and ensure user email is present
    if (!booking || !booking.user || !booking.user.email) {
      throw new Error("Invalid booking data: User email is required.");
    }

    // Create the transporter with your email credentials
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use Gmail service
      auth: {
        user: process.env.EMAIL_USER, // Your email address from .env
        pass: process.env.EMAIL_PASS, // Your app-specific password from .env
      },
    });

    // Define the email content
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to: booking.user.email, // Recipient's email address
      subject: "Booking Confirmation",
      text: `Dear ${
        booking.user.name || "Customer"
      },\n\nYour booking is confirmed!\n\nBooking Details:\n- Booking Reference: ${
        booking._id
      }\n- Flight: ${booking.flight}\n- Seats Booked: ${
        booking.seatsBooked
      }\n- Total Price: $${
        booking.totalPrice
      }\n\nThank you for choosing our service!\n\nBest regards,\nxyz Company`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Failed to send booking confirmation email:", error.message);
    throw error; // Re-throw the error for the caller to handle
  }
};

module.exports = sendBookingConfirmation;
