import React, { useEffect, useState } from 'react';

import './Planes.styles.sass';
import { IoAirplane, IoChevronForward } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { createPlaneRequest, getPlanesRequest } from '../../redux/reducer.ts';
import { Plane } from '../../redux/types.ts';
import { parsePlaneStatus } from '../../redux/utils.ts';
import { showToast } from '../../../../utils/utility.tsx';
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  HStack,
  Input,
  Select,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { colors } from '../../../../theme/colors.ts';

const renderPlaneItem: React.FC<Plane> = (item: Plane) => {
  const { value, color } = parsePlaneStatus(item.status);
  return (
    <div key={item.id} className="plane-item-card">
      <HStack>
        <IoAirplane size={22} color={colors.black} />
        <Text style={{ fontSize: 22, fontWeight: 500 }} className="plane-item-card-text">
          {item.name}
        </Text>
      </HStack>
      <Badge variant="subtle" colorScheme={color}>
        {value}
      </Badge>
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
          <Spinner />
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

  const onStatusChange = (e: any) => {
    setIsReadyToFlight(e.target.value === 'ready_to_flight');
  };

  return (
    <section className="planes-container">
      <div className="planes-left-panel">
        <Card style={{ width: '100%' }} justifyContent="flex-start">
          <CardHeader>
            <Text style={{ fontSize: 32, fontWeight: 600 }}>Create New Plane</Text>
          </CardHeader>
          <Divider />
          <CardBody justifyContent="flex-start" flexDirection={'column'}>
            <Input placeholder={'Type Plane Name...'} key="name" name="name" value={name} onInput={onChange} />
            <Box mt={2} width="100%">
              <Select
                isRequired
                value={isReadyToFlight ? 'ready_to_flight' : 'broken'}
                onChange={onStatusChange}
                placeholder="Select status"
              >
                <option value="ready_to_flight">Ready</option>
                <option value="broken">Broken</option>
              </Select>
            </Box>
          </CardBody>
          <CardFooter>
            <Button flex={1} disabled={creating} onClick={handleCreatePlane}>
              <Text className="create-button-text">Create Plane</Text>
              <Box ml={1}>{creating ? <Spinner /> : <IoChevronForward style={{ fontSize: 22 }} />}</Box>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="planes-right-panel">
        <Text style={{ fontSize: 32, fontWeight: 700 }}>Planes</Text>
        <Divider />
        {renderBody()}
      </div>
    </section>
  );
};

export default Planes;
