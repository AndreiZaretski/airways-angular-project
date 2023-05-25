import { IAirResponse, IFlightInfo } from './interfaces';

export interface IUserBooking {
  bookingPage: IBookingPage;
  cartShoppings: Array<IBookingPage>;
  flightsHistory: Array<IBookingPage>;
}

export interface IBookingPage {
  orderId: string | null

  responseAir: IAirResponse | null,

  chooseData: IChooseData | null,

  indexThereWay: number,
  indexBackWay: number,

  checkedThereWay: boolean,
  checkedBackWay: boolean,

  passengersCount: IPassengersCount | null,

  userPassengers: IUserPassengers | null,
}

// export interface ICartsData {
//   cartShoppings: Array<IUserBooking> | null,
// }

export interface IPassengersData {
  type: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDay: string;
  commonLuggage: boolean;
  cabinLuggage: boolean;
  seat: string[];
  specialAssistance?: boolean;
}

export interface IPassengersCount {
  [key: string]: number,
  adult: number,
  child: number,
  infant: number,
}

export interface IUserPassengers {
  passengers: Array<IPassengersData>;
  contactsDetail: {
    countryCode: number;
    phoneNumber: string;
    email: string;
  };
}

export interface IChooseData {
  from: string,
  to: string,
  way: string,
  dataThere: IFlightInfo,
  dataBack?: IFlightInfo,
}
