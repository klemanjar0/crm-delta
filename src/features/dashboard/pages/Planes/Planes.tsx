import React from 'react';

import './Planes.styles.sass';

const Planes: React.FC = () => {
  return (
    <section className="planes-container">
      <button className="outlined-button">
        <h2 className="create-button-text">Create Plane</h2>
      </button>
    </section>
  );
};

export default Planes;
