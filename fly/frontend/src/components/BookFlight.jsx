import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { getUserIdFromToken } from "../utils/auth"; // Utility function to extract user ID
import Footer from "./Footer";

const BookFlight = () => {
  const { id } = useParams(); // Flight ID from URL parameters
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accountNumber, setAccountNumber] = useState(""); // Bank account number
  const [bankName, setBankName] = useState(""); // Bank name
  const [walletDetails, setWalletDetails] = useState(""); // Digital wallet details
  const [paymentMethod, setPaymentMethod] = useState("card"); // Default to card payment
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("[INFO] Form submitted for payment.");

    // Basic field validations
    if (!name || !email) {
      console.error("[ERROR] Missing name or email.");
      setError("Please enter your name and email.");
      return;
    }

    if (paymentMethod === "bank_transfer" && (!accountNumber || !bankName)) {
      console.error("[ERROR] Validation failed: Bank details missing.");
      setError("Please enter your bank account number and bank name.");
      return;
    }

    if (paymentMethod === "digital_wallet" && !walletDetails) {
      console.error("[ERROR] Validation failed: Wallet details missing.");
      setError("Please enter your wallet details.");
      return;
    }
 // Add these checks to validate the booking data
  if (!id || typeof id !== "string") {
    console.error("[ERROR] Invalid flight ID:", id);
    setError("Invalid flight ID.");
    return;
  }

  if (!Number.isInteger(1) || 1 <= 0) { // seatsBooked is hardcoded to 1
    console.error("[ERROR] Invalid seatsBooked value:", 1);
    setError("Seats booked must be a positive integer.");
    return;
  }

  if (typeof 1000 !== "number" || 1000 <= 0) { // totalPrice is hardcoded
    console.error("[ERROR] Invalid totalPrice value:", 1000);
    setError("Total price must be a positive number.");
    return;
  }
  if (!id || id.length !== 24) {
    // MongoDB ObjectIds are always 24 characters long
    console.error("[ERROR] Invalid flight ID:", id);
    setError("Invalid flight ID. Please contact support.");
    return;
  }
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log("[INFO] Fetching clientSecret from backend...");
      const { data } = await axios.post(
        `https://flight-uxxl.onrender.com/api/payment`,
        { amount: 1000, currency: "usd" }
      );
      const clientSecret = data.clientSecret;
      console.log(`[INFO] Received clientSecret: ${clientSecret}`);

      let paymentResult;

      if (paymentMethod === "card") {
        console.log("[INFO] Initiating card payment...");
        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name,
                email,
              },
            },
          }
        );
        paymentResult = { error, paymentIntent };

        if (error) {
          console.error(`[ERROR] Card payment failed: ${error.message}`);
          setError(error.message);
          return;
        }

        console.log(
          `[INFO] Card payment succeeded: PaymentIntent ID - ${paymentIntent.id}`
        );
      }

      if (paymentMethod === "digital_wallet" || paymentMethod === "bank_transfer") {
        console.log(`[INFO] Simulating ${paymentMethod} payment...`);
        await axios.post(
          `https://flight-uxxl.onrender.com/api/${paymentMethod}-payment`,
          {
            user: getUserIdFromToken(),
            flight: id,
            amount: 1000,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        paymentResult = { paymentIntent: { status: "succeeded" } };
        console.log(`[INFO] ${paymentMethod} payment succeeded.`);
      }

      const { paymentIntent } = paymentResult;
      if (paymentIntent.status === "succeeded") {
        console.log("[INFO] Payment successful. Creating booking...");

        const bookingPayload = {
          flight: id,
          seatsBooked: 1,
          totalPrice: 1000,
          status: "Confirmed",
        };

        console.log("[DEBUG] Booking payload:", bookingPayload);

        const bookingResponse = await axios.post(
          "https://flight-uxxl.onrender.com/api/bookings",
          bookingPayload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("[INFO] Booking created successfully.", bookingResponse.data);
        setSuccess("Payment and booking succeeded!");
      }
    } catch (err) {
      console.error(`[ERROR] An error occurred: ${err.message}`);
      setError("Payment or booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center bg-orange-400 justify-center min-h-screen py-10">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
            Book Flight
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Name:</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email:</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Payment Method:</label>
              <select
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="digital_wallet">Digital Wallet</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>
            {paymentMethod === "card" && (
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Card Details:</label>
                <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <CardElement />
                </div>
              </div>
            )}
            {paymentMethod === "digital_wallet" && (
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Wallet Details:</label>
                <input
                  type="text"
                  placeholder="Wallet Details"
                  value={walletDetails}
                  onChange={(e) => setWalletDetails(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            )}
            {paymentMethod === "bank_transfer" && (
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Account Number:</label>
                <input
                  type="text"
                  placeholder="Account Number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <label className="block text-gray-700 font-bold mb-2 mt-4">Bank Name:</label>
                <input
                  type="text"
                  placeholder="Bank Name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay"}
            </button>
            {loading && (
              <div className="flex items-center justify-center mt-4">
                <svg
                  className="animate-spin h-5 w-5 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookFlight;
