import { Pipe, PipeTransform } from '@angular/core';
import { IPassengersCount } from 'src/app/shared/models/interface-user-booking';

@Pipe({
  name: 'totalPassengers',
})
export class TotalPassengersPipe implements PipeTransform {
  transform(passengerOptions: IPassengersCount | null) {
    if (passengerOptions) {
      return Object.values(passengerOptions).reduce((sum, acc) => sum + acc, 0);
    }
    return 0;
  }
}
