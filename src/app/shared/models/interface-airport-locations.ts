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
