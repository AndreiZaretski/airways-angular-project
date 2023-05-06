export interface IAirport {
  name: string;
  city: string;
  country: string;
  iataCode: string;
  geoloc: {
    lat: number;
    lng: number;
  },
  linksCount: number;
  objectID: string;
}
