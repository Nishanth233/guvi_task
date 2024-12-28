import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const createPaymentIntent = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payments/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 5000, currency: 'usd' })  // Example amount
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Customer Name'
        }
      }
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setSucceeded(true);
      setProcessing(false);
    }
  };

  return (
    <div>
      <button onClick={createPaymentIntent} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Pay Now</button>
      {clientSecret && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <CardElement options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } } }} />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" disabled={processing || succeeded}>
            {processing ? 'Processing...' : 'Pay'}
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          {succeeded && <div className="text-green-500 mt-2">Payment succeeded!</div>}
        </form>
      )}
    </div>
  );
};

const WrappedPaymentForm = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default WrappedPaymentForm;
