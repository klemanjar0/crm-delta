import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { DashboardState, DeleteEntityRequest, Flight, Pilot, Plane, User } from './types.ts';
import { initAssetsState } from '../../../utils/constants.ts';
import _size from 'lodash/size';
import { RootState } from '../../../store';
import _find from 'lodash/find';

const initialState: DashboardState = {
  flights: initAssetsState(),
  pilots: initAssetsState(),
  planes: initAssetsState(),
  users: initAssetsState(),
  planeCreateFetching: false,
  pilotCreateFetching: false,
  flightCreateFetching: false,
  deleteInProgress: [],
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getPlanesRequest: (state: DashboardState) => {
      state.planes.fetching = true;
      state.planes.data = [];
      state.planes.error = null;
      state.planes.total = 0;
    },
    getPlanesSuccess: (state: DashboardState, action: PayloadAction<Plane[]>) => {
      state.planes.fetching = false;
      state.planes.data = action.payload;
      state.planes.error = null;
      state.planes.total = _size(action.payload);
      state.planes.loaded = true;
    },
    getPlanesFailure: (state: DashboardState, action: PayloadAction<string>) => {
      state.planes.fetching = false;
      state.planes.error = action.payload;
      state.planes.loaded = false;
    },
    createPlaneRequest: (state: DashboardState, _: PayloadAction<Omit<Plane, 'id'>>) => {
      state.planeCreateFetching = true;
    },
    createPlaneSuccess: (state: DashboardState) => {
      state.planeCreateFetching = false;
    },
    createPlaneFailure: (state: DashboardState) => {
      state.planeCreateFetching = false;
    },
    getPilotsRequest: (state: DashboardState) => {
      state.pilots.fetching = true;
      state.pilots.data = [];
      state.pilots.error = null;
      state.pilots.total = 0;
    },
    getPilotsSuccess: (state: DashboardState, action: PayloadAction<Pilot[]>) => {
      state.pilots.fetching = false;
      state.pilots.data = action.payload;
      state.pilots.error = null;
      state.pilots.total = _size(action.payload);
      state.pilots.loaded = true;
    },
    getPilotsFailure: (state: DashboardState, action: PayloadAction<string>) => {
      state.pilots.fetching = false;
      state.pilots.error = action.payload;
      state.pilots.loaded = false;
    },
    createPilotRequest: (state: DashboardState, _: PayloadAction<Omit<Pilot, 'id'>>) => {
      state.pilotCreateFetching = true;
    },
    createPilotSuccess: (state: DashboardState) => {
      state.pilotCreateFetching = false;
    },
    createPilotFailure: (state: DashboardState) => {
      state.pilotCreateFetching = false;
    },
    getFlightsRequest: (state: DashboardState) => {
      state.flights.fetching = true;
      state.flights.data = [];
      state.flights.error = null;
      state.flights.total = 0;
    },
    getFlightsSuccess: (state: DashboardState, action: PayloadAction<Flight[]>) => {
      state.flights.fetching = false;
      state.flights.data = action.payload;
      state.flights.error = null;
      state.flights.total = _size(action.payload);
      state.flights.loaded = true;
    },
    getFlightsFailure: (state: DashboardState, action: PayloadAction<string>) => {
      state.flights.fetching = false;
      state.flights.error = action.payload;
      state.flights.loaded = false;
    },
    createFlightRequest: (state: DashboardState, _: PayloadAction<Omit<Flight, 'id'>>) => {
      state.flightCreateFetching = true;
    },
    createFlightSuccess: (state: DashboardState) => {
      state.flightCreateFetching = false;
    },
    createFlightFailure: (state: DashboardState) => {
      state.flightCreateFetching = false;
    },
    getUsersRequest: (state: DashboardState) => {
      state.users.fetching = true;
      state.users.data = [];
      state.users.error = null;
      state.users.total = 0;
    },
    getUsersSuccess: (state: DashboardState, action: PayloadAction<User[]>) => {
      state.users.fetching = false;
      state.users.data = action.payload;
      state.users.error = null;
      state.users.total = _size(action.payload);
      state.users.loaded = true;
    },
    getUsersFailure: (state: DashboardState, action: PayloadAction<string>) => {
      state.users.fetching = false;
      state.users.error = action.payload;
      state.users.loaded = false;
    },
    deleteEntityRequest: (state: DashboardState, action: PayloadAction<DeleteEntityRequest>) => {
      state.deleteInProgress = [...state.deleteInProgress, action.payload.id];
    },
    deleteEntitySuccess: (state: DashboardState, action: PayloadAction<string>) => {
      state.deleteInProgress = state.deleteInProgress.filter((it) => it !== action.payload);
    },
    deleteEntityFailure: (state: DashboardState, action: PayloadAction<string>) => {
      state.deleteInProgress = state.deleteInProgress.filter((it) => it !== action.payload);
    },
  },
});

export const isRemovingEntitySelector = (id: string) => (state: RootState) =>
  state.dashboard.deleteInProgress.includes(id);

export const {
  getPlanesSuccess,
  getPlanesFailure,
  getPlanesRequest,
  createPlaneSuccess,
  createPlaneFailure,
  createPlaneRequest,
  getPilotsSuccess,
  getPilotsFailure,
  getPilotsRequest,
  createPilotSuccess,
  createPilotFailure,
  createPilotRequest,
  getFlightsFailure,
  getFlightsSuccess,
  getFlightsRequest,
  createFlightSuccess,
  createFlightRequest,
  createFlightFailure,
  getUsersSuccess,
  getUsersFailure,
  getUsersRequest,
  deleteEntityRequest,
  deleteEntityFailure,
  deleteEntitySuccess,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
