import { IAirResponse } from './interfaces';

export interface IUserBooking {
  responseAir: IAirResponse | null,

  chooseData: IChooseData | null,

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
  dataThere: {
    price: number,
    date: string,
    checked: boolean,
  },
  dataBack?:{
    price: number,
    date: string,
    checked: boolean,
  },

}
