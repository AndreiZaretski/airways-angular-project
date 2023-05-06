import { Pipe, PipeTransform } from '@angular/core';
import airports from '../data/airports.json';
import { IAirport, TGeoloc } from '../models/interface-airport-locations';

@Pipe({
  name: 'airportName',
})
export class AirportNamePipe implements PipeTransform {
  transform(airportCode: string, transformOption: string): string | number | TGeoloc {
    const airportsList = airports;
    // const key = transformOption;
    const foundAirport = airportsList.find((x: IAirport) => x.iataCode === airportCode);
    console.log(foundAirport);
    console.log(airportCode, transformOption);

    return foundAirport ? foundAirport[transformOption as keyof typeof foundAirport] : airportCode;
    // return airportsList.find((x: IAirport) => x.iataCode === airportCode)?[key] ?? airportCode;
    // return airportsList.filter(());
  }
}
