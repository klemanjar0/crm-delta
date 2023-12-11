import React from 'react';

import './Dashboard.styles.sass';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../auth/redux/reducer.ts';
import { Text } from '@chakra-ui/react';

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
          <Text style={{ fontWeight: 800, fontSize: 22 }}>Avian</Text>
        </div>

        <div className="tabs">
          <button onClick={onFlights}>
            <Text style={{ fontWeight: 500, fontSize: 18 }}>Flights</Text>
          </button>

          <button onClick={onPilots}>
            <Text style={{ fontWeight: 500, fontSize: 18 }}>Pilots</Text>
          </button>

          <button onClick={onPlanes}>
            <Text style={{ fontWeight: 500, fontSize: 18 }}>Planes</Text>
          </button>

          <button className="dashboard-logout-btn" onClick={onLogOut}>
            <Text style={{ fontWeight: 500, fontSize: 18 }}>Log Out</Text>
          </button>
        </div>
      </div>

      <Outlet />
    </section>
  );
};

export default Dashboard;
