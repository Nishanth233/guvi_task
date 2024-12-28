import React, { useState } from 'react';
import FlightSearch from '../components/FlightSearch';
import FlightList from '../components/FlightList';

const Flights = () => {
  const [flights, setFlights] = useState([]);

  return (
    <div>
      <FlightSearch setFlights={setFlights} />
      <FlightList flights={flights} />
    </div>
  );
};

export default Flights;
