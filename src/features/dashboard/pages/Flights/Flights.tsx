import React, { useEffect, useState } from 'react';

import {
  IoAirplane,
  IoAirplaneOutline,
  IoCheckmark,
  IoChevronBack,
  IoChevronForward,
  IoPerson,
  IoTrash,
} from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import {
  createFlightRequest,
  deleteEntityRequest,
  getFlightsRequest,
  getPilotsRequest,
  getPlanesRequest,
  updateFlightStatusRequest,
} from '../../redux/reducer.ts';
import { Flight, FlightStatus, Pilot, Plane } from '../../redux/types.ts';
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
  Textarea,
  useDisclosure,
  useSteps,
} from '@chakra-ui/react';
import { colors } from '../../../../theme/colors.ts';
import moment from 'moment/moment';
import _find from 'lodash/find';
import _get from 'lodash/get';

const getStatusColor = (status: FlightStatus) => {
  switch (status) {
    case FlightStatus.Active:
      return 'green';
    case FlightStatus.Planned:
      return 'orange';
    case FlightStatus.Cancelled:
      return 'red';
    default:
      return 'blue';
  }
};

const renderFlightItem: React.FC<Flight> = (
  item: Flight,
  extra: { plane?: Plane; pilot?: Pilot; isRemoving: boolean; isUpdating: boolean; onOpenStatusChange: () => void },
) => {
  const dispatch = useDispatch();
  const onRemove = () => {
    dispatch(deleteEntityRequest({ id: item.id, type: 'FLIGHT' }));
  };
  return (
    <Box key={item.id} w="100%" px={4} py={6} backgroundColor={colors.lavender} borderRadius={4} my={4}>
      <Center>
        <Badge variant="subtle" colorScheme={getStatusColor(item.status)} color={'black'}>
          <Text>{item.status}</Text>
        </Badge>
      </Center>
      <Box w="100%">
        <Stepper index={0}>
          <Step key={0}>
            <StepIndicator>
              <StepStatus complete={<StepIcon />} incomplete={<IoAirplaneOutline />} active={<IoAirplaneOutline />} />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{item.from}</StepTitle>
              <StepDescription>{moment(item.departure_date).format('DD-MM-YYYY')}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
          <Step key={1}>
            <StepIndicator>
              <StepStatus complete={<StepIcon />} incomplete={<IoAirplane />} active={<IoAirplane />} />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{item.to}</StepTitle>
              <StepDescription>{moment(item.arrival_date).format('DD-MM-YYYY')}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        </Stepper>
      </Box>

      <Box w={2} h={2} />
      <Divider />
      <Box w={2} h={2} />

      <HStack justifyContent="space-between">
        {extra.pilot?.name ? (
          <HStack>
            <IoPerson size={12} />
            <Text textOverflow="ellipsis" whiteSpace="nowrap">
              {extra.pilot?.name}
            </Text>
          </HStack>
        ) : null}

        {extra.plane?.name ? (
          <HStack>
            <IoAirplane size={12} />
            <Text textOverflow="ellipsis" whiteSpace="nowrap">
              {extra.plane?.name}
            </Text>
          </HStack>
        ) : null}
      </HStack>

      <Box w={2} h={2} />

      <HStack flexDirection="row-reverse">
        <Button colorScheme="red" variant="outline" flexDirection="row" isLoading={extra.isRemoving} onClick={onRemove}>
          <IoTrash />
          <Box w={2} h={2} />
          <Text>Delete flight record</Text>
        </Button>
        <Button flexDirection="row" isLoading={extra.isUpdating} onClick={extra.onOpenStatusChange}>
          <Text>Change Status</Text>
        </Button>
      </HStack>

      {item.comment ? (
        <>
          <Box w={2} h={2} />
          <Divider />
          <Box w={2} h={2} />

          <Box>
            <Text>Comment: {item.comment}</Text>
          </Box>
        </>
      ) : null}
    </Box>
  );
};

const steps = [
  { title: 'First', description: 'Flight Info' },
  { title: 'Second', description: 'Pilot' },
  { title: 'Third', description: 'Plane' },
];

const Flights: React.FC = () => {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.dashboard.flights);
  const creating = useSelector((state: RootState) => state.dashboard.flightCreateFetching);
  const removeInProgress = useSelector((state: RootState) => state.dashboard.deleteInProgress);
  const updateInProgress = useSelector((state: RootState) => state.dashboard.updateStatusInProgress);

  const [activeFlightId, setActiveFlightId] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [status, setStatus] = useState<FlightStatus>(FlightStatus.Planned);
  const [error, setError] = useState<string | null>(null);
  const [pilotId, setPilotId] = useState<string | null>(null);
  const [planeId, setPlaneId] = useState<string | null>(null);
  const [departureDate, setDepartureDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [arrivalDate, setArrivalDate] = useState<string>(moment().format('YYYY-MM-DD'));

  const [newComment, setNewComment] = useState<string>('');
  const [newStatus, setNewStatus] = useState<FlightStatus>(FlightStatus.Planned);

  const { activeStep, goToNext, setActiveStep, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });

  const planesAssets = useSelector((state: RootState) => state.dashboard.planes);
  const pilotsAssets = useSelector((state: RootState) => state.dashboard.pilots);

  useEffect(() => {
    dispatch(getPilotsRequest());
    dispatch(getPlanesRequest());
    dispatch(getFlightsRequest());
  }, []);

  const onOpenStatusChange = (id: string) => () => {
    setActiveFlightId(id);
    onOpen();
  };

  const onStatusChangeSubmit = () => {
    if (!activeFlightId) {
      return;
    }

    dispatch(updateFlightStatusRequest({ id: activeFlightId, status: newStatus, comment: newComment }));
    onClose();

    setNewStatus(FlightStatus.Planned);
    setNewComment('');
  };

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

    return assets.data.map((it: Flight) => {
      const plane = _find(planesAssets.data, (p: Plane) => p.id === it.plane_id);
      const pilot = _find(pilotsAssets.data, (p: Pilot) => p.id === _get(it, ['pilots', 0]));
      return renderFlightItem(it, {
        plane,
        pilot,
        isRemoving: removeInProgress.includes(it.id),
        onOpenStatusChange: onOpenStatusChange(it.id),
        isUpdating: updateInProgress.includes(it.id),
      });
    });
  };

  const onChangeFrom = (e: any) => {
    setFrom(e.target.value);
  };
  const onChangeTo = (e: any) => {
    setTo(e.target.value);
  };
  const onChangeComment = (e: any) => {
    setComment(e.target.value);
  };
  const onChangeNewComment = (e: any) => {
    setNewComment(e.target.value);
  };

  const handleCreateFlight = () => {
    const payload = {
      from,
      to,
      departure_date: moment(departureDate).toISOString(),
      arrival_date: moment(arrivalDate).toISOString(),
      status,
      plane_id: planeId!,
      pilots: [pilotId!],
      comment,
    };

    dispatch(createFlightRequest(payload));

    setActiveStep(0);
    resetError();
    setFrom('');
    setTo('');
    setStatus(FlightStatus.Planned);
    setPlaneId(null);
    setPilotId(null);
    setComment('');
  };

  const disableBackButton = activeStep === 0 || creating;
  const disableForwardButton = creating;
  const isLastStep = activeStep === steps.length - 1;

  const onBack = () => {
    resetError();
    goToPrevious();
  };

  const onForward = () => {
    resetError();
    if (!canGoForward()) {
      switch (activeStep) {
        case 0:
          setError('Fill the metadata first.');
          return;
        case 1:
          setError('Select Valid Pilot first.');
          return;
        case 2:
          setError('Select Valid Plane first.');
          return;
      }
      return;
    }

    if (!isLastStep) {
      goToNext();
    } else {
      handleCreateFlight();
    }
  };

  const resetError = () => {
    setError(null);
  };

  const onStatusChange = (e: any) => {
    if (!e.target.value) {
      setStatus(FlightStatus.Planned);
      return;
    }
    setStatus(e.target.value as FlightStatus);
  };

  const onNewStatusChange = (e: any) => {
    if (!e.target.value) {
      setNewStatus(FlightStatus.Planned);
      return;
    }
    setNewStatus(e.target.value as FlightStatus);
  };

  const onAnyFocus = () => {
    resetError();
  };

  const onSelectPilot = (id: string) => {
    setPilotId(id);
  };

  const onSelectPlane = (id: string) => {
    setPlaneId(id);
  };

  const onChangeDepartureDate = (e: any) => {
    const value = e.target.value;

    if (!value) {
      setDepartureDate(moment().format('YYYY-MM-DD'));
    }

    setDepartureDate(value);
  };

  const onChangeArrivalDate = (e: any) => {
    const value = e.target.value;

    if (!value) {
      setArrivalDate(moment().format('YYYY-MM-DD'));
    }

    setArrivalDate(value);
  };

  const renderCreateBody = () => {
    if (creating) {
      return <Spinner />;
    }

    if (activeStep === 0) {
      return (
        <>
          <Input onFocus={onAnyFocus} placeholder={'From'} key="from" name="from" value={from} onInput={onChangeFrom} />
          <Box h={2} w={2} />
          <Input onFocus={onAnyFocus} placeholder={'To'} key="to" name="to" value={to} onInput={onChangeTo} />
          <Box h={2} w={2} />
          <Select onFocus={onAnyFocus} isRequired value={status} onChange={onStatusChange} placeholder="Select status">
            <option value={FlightStatus.Planned}>Planned</option>
            <option value={FlightStatus.BoardingPlane}>Boarding Plane</option>
            <option value={FlightStatus.Active}>Active</option>
            <option value={FlightStatus.Arrived}>Arrived</option>
            <option value={FlightStatus.Completed}>Completed</option>
            <option value={FlightStatus.Cancelled}>Cancelled</option>
          </Select>
          <Box h={2} w={2} />
          <Text>Departure Date</Text>
          <Input
            type="date"
            placeholder={'Departure Date'}
            value={departureDate}
            isRequired
            onChange={onChangeDepartureDate}
          />
          <Box h={2} w={2} />
          <Text>Arrival Date</Text>
          <Input
            type="date"
            placeholder={'Arrival Date'}
            value={arrivalDate}
            isRequired
            onChange={onChangeArrivalDate}
          />
          <Box h={2} w={2} />
          <Textarea
            onFocus={onAnyFocus}
            placeholder={'Comment'}
            key="comment"
            name="comment"
            value={comment}
            onInput={onChangeComment}
          />
        </>
      );
    }

    if (activeStep === 1) {
      if (pilotsAssets.total === 0) {
        return <Text>No pilots present. Create a new one</Text>;
      }

      if (pilotsAssets.fetching) {
        return <Spinner />;
      }

      return (
        <>
          <Box w="100%" h="120px" overflowY="scroll" overflowX="hidden">
            <RadioGroup onChange={onSelectPilot} value={pilotId || undefined}>
              <Stack direction="column">
                {pilotsAssets.data.map((item) => {
                  return (
                    <Radio checked={item.id === pilotId} key={item.id} value={item.id}>
                      <HStack>
                        <IoPerson size={12} />
                        <Text textOverflow="ellipsis" whiteSpace="nowrap">
                          {item.name}
                        </Text>
                      </HStack>
                    </Radio>
                  );
                })}
              </Stack>
            </RadioGroup>
          </Box>
        </>
      );
    }

    if (activeStep === 2) {
      if (planesAssets.total === 0) {
        return <Text>No planes present. Create a new one</Text>;
      }

      if (planesAssets.fetching) {
        return <Spinner />;
      }

      return (
        <>
          <Box w="100%" h="120px" overflowY="scroll" overflowX="hidden">
            <RadioGroup onChange={onSelectPlane} value={planeId || undefined}>
              <Stack direction="column">
                {planesAssets.data.map((item) => {
                  return (
                    <Radio
                      opacity={item.status === 'ready_to_flight' ? 1 : 0.4}
                      checked={item.id === planeId}
                      key={item.id}
                      value={item.id}
                    >
                      <HStack textOverflow="ellipsis" whiteSpace="nowrap" justifyContent="space-between">
                        <HStack>
                          <IoAirplane size={12} />
                          <Text textOverflow="ellipsis" whiteSpace="nowrap">
                            {item.name}
                          </Text>
                        </HStack>

                        <Badge color={item.status === 'ready_to_flight' ? 'green' : 'red'}>{item.status}</Badge>
                      </HStack>
                    </Radio>
                  );
                })}
              </Stack>
            </RadioGroup>
          </Box>
        </>
      );
    }
  };

  const canGoForward = () => {
    if (activeStep === 0) {
      return !!from && !!to && !!status && !!departureDate;
    }
    if (activeStep === 1) {
      return !!pilotId;
    }
    if (activeStep === 2) {
      const status = _find(planesAssets.data, (it) => it.id === planeId)?.status;

      return !!planeId && status !== 'broken';
    }
  };

  return (
    <>
      <section className="planes-container">
        <div className="planes-left-panel">
          <Card style={{ width: '100%' }} justifyContent="flex-start">
            <CardHeader>
              <Text style={{ fontSize: 32, fontWeight: 600 }}>Schedule a new flight</Text>
            </CardHeader>
            <Divider />
            <CardBody justifyContent="flex-start" flexDirection={'column'}>
              <Stepper index={activeStep}>
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                    </StepIndicator>

                    <Box flexShrink="0">
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>

              <Box h={10} w={10} />

              {renderCreateBody()}
              <Box h={2} />
              {error ? <Text color={colors.sunsetOrange}>{error}</Text> : null}
            </CardBody>
            <CardFooter>
              <Button flex={1} disabled={disableBackButton} opacity={disableBackButton ? 0.4 : 1} onClick={onBack}>
                <Text className="create-button-text">Back</Text>
                <Box ml={1}>
                  <IoChevronBack style={{ fontSize: 22 }} />
                </Box>
              </Button>
              <Box w={2} />
              <Button
                flex={1}
                disabled={disableForwardButton}
                opacity={disableForwardButton ? 0.4 : 1}
                onClick={onForward}
              >
                <Text className="create-button-text">{isLastStep ? 'Submit' : 'Next'}</Text>
                <Box ml={1}>
                  {creating ? (
                    <Spinner />
                  ) : isLastStep ? (
                    <IoCheckmark size={22} />
                  ) : (
                    <IoChevronForward style={{ fontSize: 22 }} />
                  )}
                </Box>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="planes-right-panel">
          <Text style={{ fontSize: 32, fontWeight: 700 }}>Flights</Text>
          <Divider />
          {renderBody()}
        </div>
      </section>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Flight Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              onFocus={onAnyFocus}
              isRequired
              value={newStatus}
              onChange={onNewStatusChange}
              placeholder="Select status"
            >
              <option value={FlightStatus.Planned}>Planned</option>
              <option value={FlightStatus.BoardingPlane}>Boarding Plane</option>
              <option value={FlightStatus.Active}>Active</option>
              <option value={FlightStatus.Arrived}>Arrived</option>
              <option value={FlightStatus.Completed}>Completed</option>
              <option value={FlightStatus.Cancelled}>Cancelled</option>
            </Select>
            <Box w={2} h={2} />
            <Textarea
              onFocus={onAnyFocus}
              placeholder={'Comment'}
              key="newComment"
              name="newComment"
              value={newComment}
              onInput={onChangeNewComment}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={onStatusChangeSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Flights;
