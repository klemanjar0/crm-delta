import { AssetsState } from '../../../utils/constants.ts';

export type Plane = {
  id: string;
  name: string;
  status: string;
};

export type Pilot = {
  id: string;
  name: string;
  qualification: string;
};

export type Flight = {
  id: string;
  name: string;
  qualification: string;
};

export type PlanesState = AssetsState<Plane>;

export type PilotsState = AssetsState<Pilot>;

export type FlightsState = AssetsState<Flight>;

export interface DashboardState {
  planes: PlanesState;
  pilots: PilotsState;
  flights: FlightsState;
  planeCreateFetching: boolean;
  pilotCreateFetching: boolean;
}
