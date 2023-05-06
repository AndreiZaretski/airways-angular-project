import { Pipe, PipeTransform } from '@angular/core';
import { IPassengers } from 'src/app/main/model/search-form.model';

@Pipe({
  name: 'totalPassengers',
})
export class TotalPassengersPipe implements PipeTransform {
  transform(passengerOptions: IPassengers[]): unknown {
    return passengerOptions.reduce((sum, acc) => sum + (acc.count as number), 0);
  }
}
