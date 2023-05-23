import { Component, DoCheck, Input } from '@angular/core';
import { ICurrentFlightSummary } from '../../pages/summary-page/summary-page.component';
import {
  IPassengersCount,
  IPassengersData,
} from 'src/app/shared/models/interface-user-booking';

@Component({
  selector: 'app-total-sum',
  templateUrl: './total-sum.component.html',
  styleUrls: ['./total-sum.component.scss'],
})
export class TotalSumComponent implements DoCheck {
  @Input() currentFlight: ICurrentFlightSummary[] = [];
  @Input() passengersCountWithTypes: IPassengersCount = {
    adult: 0,
    child: 0,
    infant: 0,
  };

  fareThere: number = 0;

  fareBack: number = 0;

  typesOfPassengers = Object.keys(this.passengersCountWithTypes);

  ngDoCheck() {
    if (this.currentFlight[0]?.flightData?.price?.usd) {
      this.fareThere = this.currentFlight[0]?.flightData?.price?.usd;
    }
    if (this.currentFlight[1]?.flightData?.price?.usd) {
      this.fareBack = this.currentFlight[1]?.flightData?.price?.usd;
    }
  }

  calculateFare(type: string) {
    const totalFare = this.fareThere + this.fareBack;
    return type === 'adult'
      ? totalFare
      : type === 'child'
      ? totalFare * 0.8
      : totalFare * 0.3;
  }

  calculateTotal() {
    return Object.keys(this.passengersCountWithTypes).reduce(
      (acc, rec) =>
        acc + this.passengersCountWithTypes[rec] * this.calculateFare(rec),
      0
    );
  }
}
