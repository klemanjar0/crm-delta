import React from 'react';

import './Dashboard.styles.sass';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const onFlights = () => {
    navigate('flights', { relative: 'route' });
  };
  const onPilots = () => {
    navigate('pilots', { relative: 'route' });
  };
  const onPlanes = () => {
    navigate('planes', { relative: 'route' });
  };

  return (
    <section className="dashboard-container">
      <div className="nav-bar">
        <div>
          <h1>Avian</h1>
        </div>

        <div className="tabs">
          <button onClick={onFlights}>
            <h3>Flights</h3>
          </button>

          <button onClick={onPilots}>
            <h3>Pilots</h3>
          </button>

          <button onClick={onPlanes}>
            <h3>Planes</h3>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
