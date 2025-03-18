import { Pipe, PipeTransform } from '@angular/core';
import airports from '../data/airports.json';
import { IAirport, TGeoloc } from '../models/interface-locations-passengers';

@Pipe({
  name: 'airportName',
})
export class AirportNamePipe implements PipeTransform {
  transform(airportCode: string, transformOption: string): string | number | TGeoloc {
    const airportsList = airports;
    const foundAirport = airportsList.find((x: IAirport) => x.iataCode === airportCode);

    return foundAirport ? foundAirport[transformOption as keyof typeof foundAirport] : airportCode;
  }
}
