import React from 'react';

import './Dashboard.styles.sass';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../auth/redux/reducer.ts';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFlights = () => {
    navigate('flights', { relative: 'route' });
  };
  const onPilots = () => {
    navigate('pilots', { relative: 'route' });
  };
  const onPlanes = () => {
    navigate('planes', { relative: 'route' });
  };
  const onLogOut = () => {
    dispatch(logOut());
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

          <button className="dashboard-logout-btn" onClick={onLogOut}>
            <h3>Log Out</h3>
          </button>
        </div>
      </div>

      <Outlet />
    </section>
  );
};

export default Dashboard;
