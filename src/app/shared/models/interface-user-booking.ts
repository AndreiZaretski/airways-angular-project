import { IAirResponse, IFlightInfo } from './interfaces';

export interface IUserBooking {
  orderId: string | null

  responseAir: IAirResponse | null,

  chooseData: IChooseData | null,

  checkedFrom: boolean,
  checkedTo: boolean,

  passengersCount: IPassengersCount | null,

  userPassengers: IUserPassengers | null
}

export interface ICartsData {
  cartShoppings: Array<IUserBooking>
}

export interface IPassengersData {
  firstName: string,
  lastName: string,
  gender: string,
  dateBirth: string,
  bagage?: string,
  specialAssistance?: boolean,
}

export interface IPassengersCount {
  adult: number,
  child: number,
  infant: number,
}

export interface IUserPassengers {
  adult: Array<IPassengersData>,
  child: Array<IPassengersData>,
  infant: Array<IPassengersData>,
  contactsDetail: {
    countriCode: string,
    phoneNumber: string,
    email: string,
  }
}

export interface IChooseData {
  from: string,
  to: string,
  way: string,
  dataThere: IFlightInfo,
  dataBack?: IFlightInfo,
}
