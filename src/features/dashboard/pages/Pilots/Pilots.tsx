import React, { useEffect, useState } from 'react';

import { IoChevronForward } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { createPilotRequest, getPilotsRequest } from '../../redux/reducer.ts';
import { Pilot } from '../../redux/types.ts';
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
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';

const renderPilotItem: React.FC<Pilot> = (item: Pilot) => {
  return (
    <div key={item.id} className="plane-item-card">
      <Text style={{ fontSize: 22, fontWeight: 500 }} className="plane-item-card-text">
        {item.name}
      </Text>
      <Badge variant="subtle" colorScheme={'purple'}>
        {item.qualification}
      </Badge>
    </div>
  );
};

const Pilots: React.FC = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.dashboard.pilots);
  const creating = useSelector((state: RootState) => state.dashboard.pilotCreateFetching);
  const [name, setName] = useState<string>('');
  const [qualification, setQualification] = useState<string>('');

  useEffect(() => {
    dispatch(getPilotsRequest());
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

    return assets.data.map(renderPilotItem);
  };

  const onChange = (e: any) => {
    setName(e.target.value);
  };

  const onChangeQ = (e: any) => {
    setQualification(e.target.value);
  };

  const handleCreatePilot = () => {
    if (!name || !qualification) {
      showToast('Fill the metadata first.');
      return;
    }

    dispatch(createPilotRequest({ name, qualification }));
    setName('');
    setQualification('');
  };

  return (
    <section className="planes-container">
      <div className="planes-left-panel">
        <Card style={{ width: '100%' }} justifyContent="flex-start">
          <CardHeader>
            <Text style={{ fontSize: 32, fontWeight: 600 }}>Add New Pilot</Text>
          </CardHeader>
          <Divider />
          <CardBody justifyContent="flex-start" flexDirection={'column'}>
            <Input placeholder={'Type Pilot Name...'} key="name" name="name" value={name} onInput={onChange} />
            <Input
              mt={2}
              placeholder={'Type Qualification...'}
              key="qualification"
              name="qualification"
              value={qualification}
              onInput={onChangeQ}
            />
          </CardBody>
          <CardFooter>
            <Button flex={1} disabled={creating} onClick={handleCreatePilot}>
              <Text className="create-button-text">Create Pilot</Text>
              <Box ml={1}>{creating ? <Spinner /> : <IoChevronForward style={{ fontSize: 22 }} />}</Box>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="planes-right-panel">
        <Text style={{ fontSize: 32, fontWeight: 700 }}>Pilots</Text>
        <Divider />
        {renderBody()}
      </div>
    </section>
  );
};

export default Pilots;
