import React from 'react';

const FlightList = ({ flights }) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center p-8">
      {flights.map((flight, index) => (
        <div key={index} className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-72 transform transition-transform hover:translate-y-2">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium"><strong>Airline:</strong> {flight.airline}</p>
            <p className="text-lg font-medium"><strong>Flight Number:</strong> {flight.flightNumber}</p>
            <p className="text-lg font-medium"><strong>Duration:</strong> {flight.duration}</p>
            <p className="text-lg font-medium"><strong>Departure:</strong> {flight.departure}</p>
            <p className="text-lg font-medium"><strong>Arrival:</strong> {flight.arrival}</p>
            <p className="text-lg font-medium"><strong>Currency:</strong> {flight.price.currency}</p>
            <p className="text-lg font-medium"><strong>Total:</strong> {flight.price.total}</p>
            <p className="text-lg font-medium"><strong>Base:</strong> {flight.price.base}</p>
            <p className="text-lg font-medium"><strong>Fees:</strong> {flight.price.fees.join(', ')}</p>
            <p className="text-lg font-medium"><strong>Grand Total:</strong> {flight.price.grandTotal}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightList;
