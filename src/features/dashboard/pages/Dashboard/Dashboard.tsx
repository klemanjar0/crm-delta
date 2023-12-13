import React, { useEffect } from 'react';

import './Dashboard.styles.sass';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../auth/redux/reducer.ts';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { RootState } from '../../../../store';
import { getUsersRequest } from '../../redux/reducer.ts';
import { colors } from '../../../../theme/colors.ts';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.username);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const assets = useSelector((state: RootState) => state.dashboard.users);
  const modal = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

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
    onOpen();
  };

  const handleLogOut = () => {
    onClose();
    dispatch(logOut());
  };

  const onUsers = () => {
    modal.onOpen();
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUsersRequest());
    }
  }, []);

  return (
    <>
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

            {username?.toLowerCase() === 'admin' ? (
              <button onClick={onUsers}>
                <Text style={{ fontWeight: 500, fontSize: 18 }}>Users</Text>
              </button>
            ) : null}

            <button className="dashboard-logout-btn" onClick={onLogOut}>
              <Text style={{ fontWeight: 500, fontSize: 18 }}>Log Out</Text>
            </button>
          </div>
        </div>

        <Outlet />
      </section>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Log Out.
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure you want to log out?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleLogOut} ml={3}>
                Log Out
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>System users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {assets.fetching ? (
              <Center>
                <Spinner />
              </Center>
            ) : (
              <Box>
                {assets.data.map((it) => {
                  return (
                    <Box key={it.email + it.role} my={2} px={2} py={2} backgroundColor={colors.lavender}>
                      <Text fontWeight={'bold'}>{it.email}</Text>
                      <Box w={2} h={2} />
                      <Text>Role: {it.role}</Text>
                    </Box>
                  );
                })}
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={modal.onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Dashboard;
