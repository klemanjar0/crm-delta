import React, { useEffect, useState } from 'react';

import './Planes.styles.sass';
import { IoChevronForward } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { createPlaneRequest, getPlanesRequest } from '../../redux/reducer.ts';
import { Plane } from '../../redux/types.ts';
import Spinner from '../../../../components/Spinner/Spinner.tsx';
import { parsePlaneStatus } from '../../redux/utils.ts';
import { showToast } from '../../../../utils/utility.tsx';

const renderPlaneItem: React.FC<Plane> = (item: Plane) => {
  return (
    <div key={item.id} className="plane-item-card">
      <h3 className="plane-item-card-text">{item.name}</h3>
      <div className="plane-item-card-status">{parsePlaneStatus(item.status)}</div>
    </div>
  );
};

const Planes: React.FC = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.dashboard.planes);
  const creating = useSelector((state: RootState) => state.dashboard.planeCreateFetching);
  const [name, setName] = useState<string>('');
  const [isReadyToFlight, setIsReadyToFlight] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getPlanesRequest());
  }, []);

  const renderBody = () => {
    if (assets.fetching) {
      return (
        <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner size={120} />
        </div>
      );
    }

    if (assets.error) {
      return <h3>{assets.error}</h3>;
    }

    if (assets.loaded && assets.data.length === 0) {
      return <span>No data.</span>;
    }

    return assets.data.map(renderPlaneItem);
  };

  const onChange = (e: any) => {
    setName(e.target.value);
  };

  const handleCreatePlane = () => {
    if (!name) {
      showToast('Fill the plane name first.');
      return;
    }

    dispatch(createPlaneRequest({ name, status: isReadyToFlight ? 'ready_to_flight' : 'broken' }));
    setName('');
    setIsReadyToFlight(true);
  };

  const onCheckBoxChange = () => {
    setIsReadyToFlight((prev) => !prev);
  };

  return (
    <section className="planes-container">
      <div className="planes-left-panel">
        <section style={{ width: '100%' }}>
          <h2>Create New Plane</h2>
          <input
            placeholder={'Type Plane Name...'}
            key="name"
            name="name"
            type="text"
            value={name}
            onInput={onChange}
          />
          <div className="ready-status-row">
            <span>Ready To Flight</span>
            <input
              placeholder={'Ready To Flight'}
              key="status"
              name="status"
              type="checkbox"
              checked={isReadyToFlight}
              onChange={onCheckBoxChange}
            />
          </div>
        </section>

        <div className="outlined-div-create-plane">
          <button disabled={creating} onClick={handleCreatePlane} className="button-create-row">
            <h2 className="create-button-text">Create Plane</h2>
            {creating ? <Spinner size={60} /> : <IoChevronForward style={{ fontSize: 22 }} />}
          </button>
        </div>
      </div>

      <div className="planes-right-panel">
        <h2>Planes</h2>
        {renderBody()}
      </div>
    </section>
  );
};

export default Planes;
