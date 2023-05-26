export interface IAirport {
  [key: string] : string | number | TGeoloc;
  name: string;
  city: string;
  country: string;
  iataCode: string;
  geoloc: TGeoloc;
  linksCount: number;
  objectID: string;
}

export type TGeoloc = { [key: string]: number };

export interface IPassengers {
  value: string;
  viewCategory: string;
  viewDesc: string;
  count: number;
  selected: boolean;
}
