import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { DashboardState, Pilot, Plane } from './types.ts';
import { initAssetsState } from '../../../utils/constants.ts';
import _size from 'lodash/size';

const initialState: DashboardState = {
  flights: initAssetsState(),
  pilots: initAssetsState(),
  planes: initAssetsState(),
  planeCreateFetching: false,
  pilotCreateFetching: false,
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
  },
});

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
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
