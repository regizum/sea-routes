export type Longitude = number;
export type Latitude = number;
export type Timestamp = number;
export type Speed = number;

export type RoutePoint = [Longitude, Latitude, Timestamp, Speed];

export interface IRoute {
  route_id: number;
  from_port: string;
  to_port: string;
  leg_duration: number;
  points: RoutePoint[];
}
