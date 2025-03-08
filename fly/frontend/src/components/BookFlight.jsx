import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { getUserIdFromToken } from "../utils/auth"; // Import utility function to get user ID
import Footer from "./Footer";

const BookFlight = () => {
  const { id } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accountNumber, setAccountNumber] = useState(""); // New state for bank account number
  const [bankName, setBankName] = useState(""); // New state for bank name
  const [walletDetails, setWalletDetails] = useState(""); // New state for digital wallet details
  const [paymentMethod, setPaymentMethod] = useState("card"); // Add state for payment method
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validations for required fields
    if (!name || !email) {
      setError("Please enter your name and email.");
      return;
    }

    if (paymentMethod === "bank_transfer" && (!accountNumber || !bankName)) {
      setError("Please enter your bank account number and bank name.");
      return;
    }

    if (paymentMethod === "digital_wallet" && !walletDetails) {
      setError("Please enter your wallet details.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data: clientSecret } = await axios.post(
        `https://flight-uxxl.onrender.com/api/payment`,
        {
          amount: 1000, // Replace with your desired amount
          currency: "usd",
        }
      );

      let paymentResult;

      if (paymentMethod === "card") {
        const cardElement = elements.getElement(CardElement);
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: name,
                email: email,
              },
            },
          }
        );
        paymentResult = { error, paymentIntent };
      } else if (paymentMethod === "digital_wallet") {
        // Handle digital wallet payment
        paymentResult = { paymentIntent: { status: "succeeded" } }; // Simulated success for placeholder

        // Here you would send the digital wallet details to your backend for processing
        await axios.post(
          `https://flight-uxxl.onrender.com/api/digital-wallet-payment`,
          {
            user: getUserIdFromToken(),
            flight: id,
            amount: 1000,
            walletDetails, // Include digital wallet details
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else if (paymentMethod === "bank_transfer") {
        // Handle bank transfer payment
        paymentResult = { paymentIntent: { status: "succeeded" } }; // Simulated success for placeholder

        // Here you would send the bank transfer details to your backend for processing
        await axios.post(
          `https://flight-uxxl.onrender.com/api/bank-transfer`,
          {
            user: getUserIdFromToken(),
            flight: id,
            amount: 1000,
            accountNumber, // Include bank account number
            bankName, // Include bank name
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      const { error, paymentIntent } = paymentResult;

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        const userId = getUserIdFromToken();
        if (!userId) {
          setError("User ID not found");
          setLoading(false);
          return;
        }

        // Send a request to create the booking
        await axios.post(
          `https://flight-uxxl.onrender.com/api/bookings`,
          {
            user: userId,
            flight: id, // Use the flight ID from the URL params
            seatsBooked: 1,
            totalPrice: 1000, // Replace with your desired amount
            status: "Confirmed",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setSuccess("Payment and booking succeeded!");
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
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
              <label className="block text-gray-700 font-bold mb-2">
                Name:
              </label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email:
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Payment Method:
              </label>
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
                <label className="block text-gray-700 font-bold mb-2">
                  Card Details:
                </label>
                <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <CardElement />
                </div>
              </div>
            )}
            {paymentMethod === "digital_wallet" && (
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">
                  Wallet Details:
                </label>
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
                <label className="block text-gray-700 font-bold mb-2">
                  Account Number:
                </label>
                <input
                  type="text"
                  placeholder="Account Number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <label className="block text-gray-700 font-bold mb-2 mt-4">
                  Bank Name:
                </label>
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
