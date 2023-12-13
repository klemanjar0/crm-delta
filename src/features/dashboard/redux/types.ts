import { AssetsState } from '../../../utils/constants.ts';

export enum FlightStatus {
  Planned = 'planned',
  BoardingPlane = 'boarding_plane',
  Active = 'active',
  Arrived = 'arrived',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

export type User = {
  email: string;
  role: string;
};

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
  plane_id: string;
  pilots: string[];
  status: FlightStatus;
  comment: string;
  departure_date: string; // iso
  arrival_date: string; // iso
  from: string;
  to: string;
};

export type PlanesState = AssetsState<Plane>;

export type PilotsState = AssetsState<Pilot>;

export type FlightsState = AssetsState<Flight>;

export type UsersState = AssetsState<User>;

export interface DashboardState {
  planes: PlanesState;
  pilots: PilotsState;
  flights: FlightsState;
  users: UsersState;
  planeCreateFetching: boolean;
  pilotCreateFetching: boolean;
  flightCreateFetching: boolean;
}
