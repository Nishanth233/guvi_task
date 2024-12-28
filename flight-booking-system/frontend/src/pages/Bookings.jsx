import React, { useState, useEffect } from 'react';
import { getBookings, deleteBooking, bookFlight } from '../services/bookingService';
import WrappedPaymentForm from './PaymentForm';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [flight, setFlight] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setBookings(data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        flight,
        seatNumber,
        name,
        phone,
        email
      };
      const result = await bookFlight(bookingData);
      setConfirmation(result);
      const data = await getBookings();
      setBookings(data);
    } catch (error) {
      console.error('Failed to book flight:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id);
      setBookings(bookings.filter(booking => booking._id !== id));
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  };

  const handleDownload = (booking) => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(booking, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `booking_${booking._id}.json`;
    document.body.appendChild(element);
    element.click();
  };

  const handlePrint = (booking) => {
    const printContents = `
      <h1>Booking Confirmation</h1>
      <p><strong>ID:</strong> ${booking._id}</p>
      <p><strong>Flight ID:</strong> ${booking.flight}</p>
      <p><strong>Seat Number:</strong> ${booking.seatNumber}</p>
      <p><strong>Passenger Name:</strong> ${booking.user.name}</p>
      <p><strong>Status:</strong> ${booking.status}</p>
    `;
    const printWindow = window.open('', '', 'height=400,width=800');
    printWindow.document.write('<html><head><title>Print Booking</title></head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      
      <h2 className="text-xl font-semibold mb-2">Book Flight</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Flight ID"
            value={flight}
            onChange={(e) => setFlight(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Seat Number"
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Book Flight
        </button>
      </form>
      {confirmation && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p className="font-bold">Booking Confirmed</p>
          <p>Booking ID: {confirmation._id}</p>
          <p>Status: {confirmation.status}</p>
        </div>
      )}
      
      <h2 className="text-xl font-semibold mb-2">Make Payment</h2>
      <WrappedPaymentForm />

      <h2 className="text-xl font-semibold mb-2">Manage Bookings</h2>
      <ul className="space-y-4">
        {bookings.map(booking => (
          <li key={booking._id} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <p><strong>ID:</strong> {booking._id}</p>
            <p><strong>Flight ID:</strong> {booking.flight}</p>
            <p><strong>Seat Number:</strong> {booking.seatNumber}</p>
            <p><strong>Passenger Name:</strong> {booking.user.name}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => handleDelete(booking._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel Booking
              </button>
              <button
                onClick={() => handleDownload(booking)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Download Confirmation
              </button>
              <button
                onClick={() => handlePrint(booking)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Print Confirmation
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
