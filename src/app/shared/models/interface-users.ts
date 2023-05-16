import { Currency } from '../enums/currency.enum';
import { DateFormat } from '../enums/date.enum';
import { IBookingPage } from './interface-user-booking';

export interface AuthResponse {
  accessToken?: string,
  user: {
    email: string,
    birthDay: string,
    citizenship: string,
    countryCode: number,
    password?: string,
    firstName: string,
    gender: string,
    lastName: string,
    phoneNumber: number,
    termsUse: boolean,
    id: number,
    orders?: Array<IBookingPage>
  }
}

export interface AuthResponseLight {

  email: string,
  birthDay: string | DateFormat,
  citizenship: string,
  countryCode: number,
  password?: string,
  firstName: string,
  gender: string,
  lastName: string,
  phoneNumber: number,
  termsUse: boolean,
  id: number,
  orders?: Array<IBookingPage>

}

export interface AuthLogin {
  email: string,
  password: string,
}

export interface AuthRegistration {
  email: string,
  birthDay: string | Date,
  citizenship: string,
  countryCode: number,
  password: string,
  firstName: string,
  gender: string,
  lastName: string,
  phoneNumber: number,
  termsUse: boolean,
}

export interface IUserSettings {
  currency: Currency,
  dateFormat: DateFormat,
}
