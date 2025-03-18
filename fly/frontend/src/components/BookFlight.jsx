import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Footer from "./Footer";

const BookFlight = () => {
  const { id } = useParams(); // Flight ID from URL parameters
  const stripe = useStripe();
  const elements = useElements();

  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("[INFO] Form submitted for payment.");

    // Basic field validations
    if (!name || !email) {
      console.error("[ERROR] Missing name or email.");
      setError("Please enter your name and email.");
      return;
    }

    if (!id || id.length !== 24) {
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

      if (error) {
        console.error(`[ERROR] Card payment failed: ${error.message}`);
        setError(error.message);
        return;
      }

      console.log(
        `[INFO] Card payment succeeded: PaymentIntent ID - ${paymentIntent.id}`
      );

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

        console.log(
          "[INFO] Booking created successfully.",
          bookingResponse.data
        );
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
              <label className="block text-gray-700 font-bold mb-2">
                Name:
              </label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
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
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                Card Details:
              </label>
              <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <CardElement />
              </div>
            </div>
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
