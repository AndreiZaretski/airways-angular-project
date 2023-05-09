import { Component } from '@angular/core';

export interface PeriodicElement {
  position: string;
  flight: string;
  typeTrip: string;
  dataType: string;
  passengers: string;
  price: number;
}

export interface Passenger {
  firstName: string;
  lastName: string;
  commonLuggage: string;
  cabinLuggage: string;
  seat: string;
  cost: number;
}

export interface IPassengersTotalSum {
  [key: string]: Passenger[];
  adult: Passenger[];
  child: Passenger[];
  infant: Passenger[];
}

const DATA: PeriodicElement[] = [
  {
    position: 'FR 1925',
    flight: 'Dublin - Warsaw Modlin',
    typeTrip: 'Round trip',
    dataType: '1 Mar 2023, 8:40 - 12:00',
    passengers: '1 x Adult',
    price: 234.55,
  },
  {
    position: 'FR 4658',
    flight: 'Warsaw Modlin - Dublin',
    typeTrip: 'Round trip',
    dataType: '11 Mar 2023, 20:40 - 23:00',
    passengers: '1 x Adult',
    price: 150.55,
  },
];

const PASSENGERS: Passenger[] = [
  {
    firstName: 'Harry',
    lastName: 'Potter',
    commonLuggage: '1checked bag (total 23 kg) included',
    cabinLuggage: '1 cabin bag + 1 personal item (max. 8 kg) included',
    seat: 'Seat 19E',
    cost: 166,
  },
  {
    firstName: 'Lilly',
    lastName: 'Potter',
    commonLuggage: '1checked bag (total 23 kg) included',
    cabinLuggage: '1 cabin bag + 1 personal item (max. 8 kg) included',
    seat: 'Seat 20E',
    cost: 106,
  },
  {
    firstName: 'James',
    lastName: 'Potter',
    commonLuggage: '1checked bag (total 23 kg) included',
    cabinLuggage: '1 cabin bag + 1 personal item (max. 8 kg) included',
    seat: '',
    cost: 88,
  },
];

const PASSENGERSTOTALSUM: IPassengersTotalSum = {
  adult: [
    {
      firstName: 'Harry',
      lastName: 'Potter',
      commonLuggage: '1checked bag (total 23 kg) included',
      cabinLuggage: '1 cabin bag + 1 personal item (max. 8 kg) included',
      seat: 'Seat 19E',
      cost: 166,
    },
    {
      firstName: 'Henry',
      lastName: 'Potter',
      commonLuggage: '1checked bag (total 23 kg) included',
      cabinLuggage: '1 cabin bag + 1 personal item (max. 8 kg) included',
      seat: 'Seat 19E',
      cost: 166,
    },
  ],
  child: [
    {
      firstName: 'Lilly',
      lastName: 'Potter',
      commonLuggage: '1checked bag (total 23 kg) included',
      cabinLuggage: '1 cabin bag + 1 personal item (max. 8 kg) included',
      seat: 'Seat 20E',
      cost: 106,
    },
  ],
  infant: [
    {
      firstName: 'James',
      lastName: 'Potter',
      commonLuggage: '1checked bag (total 23 kg) included',
      cabinLuggage: '1 cabin bag + 1 personal item (max. 8 kg) included',
      seat: '',
      cost: 88,
    },
  ],
};

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent {
  currentFlight = DATA;

  passengers = PASSENGERS;

  passengersTotalSum = PASSENGERSTOTALSUM;
}
