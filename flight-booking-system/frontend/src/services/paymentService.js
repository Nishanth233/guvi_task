import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/payments/create`;

const processPayment = async (paymentData) => {
  const response = await axios.post(API_URL, paymentData, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`,
    },
  });
  return response.data;
};

const paymentService = {
  processPayment,
};

export default paymentService;
