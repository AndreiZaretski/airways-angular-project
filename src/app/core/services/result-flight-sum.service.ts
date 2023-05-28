import { Injectable } from '@angular/core';
import { IBookingPage } from 'src/app/shared/models/interface-user-booking';

@Injectable({
  providedIn: 'root',
})
export class ResultFlightSumService {
  constructor() {}

  calculateTotalSum(flight: IBookingPage, userCurrency: string) {
    let result = 0;
    const fareThere = flight.responseAir?.thereWay[flight.indexThereWay]?.price[userCurrency
      .toLowerCase()] || 0;

    const fareBack = flight.responseAir?.backWay
      ? flight.responseAir?.backWay[flight.indexBackWay]?.price[userCurrency.toLowerCase()]
      : 0;
    const totalFare = fareBack + fareThere;
    if (flight.passengersCount) {
      Object.entries(flight.passengersCount).forEach(([type, count]) => {
        if (type === 'adult') {
          result += totalFare * count;
        } else if (type === 'child') {
          result += totalFare * 0.8 * count;
        } else {
          result += totalFare * 0.3 * count;
        }
      });
    }
    return result;
  }

  calculateFareByType(type: string, fareThere: number, fareBack: number) {
    const totalFare = fareThere + fareBack;
    if (type === 'adult') {
      return totalFare;
    }
    if (type === 'child') {
      return totalFare * 0.8;
    }
    return totalFare * 0.3;
  }
}
