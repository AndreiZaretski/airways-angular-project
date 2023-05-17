import { AuthResponseLight, IUserSettings } from 'src/app/shared/models/interface-users';
import { IPassengers } from 'src/app/main/model/search-form.model';
import { IUserBooking } from 'src/app/shared/models/interface-user-booking';
import { ISearchForm } from 'src/app/shared/models/interfaces';
import { Currency } from 'src/app/shared/enums/currency.enum';
import { DateFormat } from 'src/app/shared/enums/date.enum';

export interface ISearchMainState {
  searchForm: ISearchForm,
  passengerOptions: IPassengers[]
}

export interface IState {
  authState: AuthResponseLight | null,
  userSettings: IUserSettings,
  searchMainState: {
    searchForm: ISearchForm,
    passengerOptions: IPassengers[]
  },
}

export const StateInit: IState = {
  authState: null,
  userSettings: {
    currency: Currency.EUR,
    dateFormat: DateFormat.MDY,
  },
  searchMainState: {
    searchForm: {
      startDate: '',
      endDate: '',
      passengers: [],
      route: {
        fromLocation: '',
        toLocation: '',
      },
      way: 'round',
    },
    passengerOptions: [
      {
        value: 'Adult', viewCategory: 'Adults', viewDesc: '14+ years', count: 0, selected: false,
      },
      {
        value: 'Child', viewCategory: 'Child', viewDesc: '2-14 years', count: 0, selected: false,
      },
      {
        value: 'Infant', viewCategory: 'Infant', viewDesc: '0-2 years', count: 0, selected: false,
      },
    ],
  },
};

export const UserBookingStateInit: IUserBooking = {
  bookingPage: {
    orderId: null,
    responseAir: null,
    chooseData: null,
    indexThereWay: 3,
    indexBackWay: 3,
    checkedThereWay: false,
    checkedBackWay: false,
    passengersCount: null,
    userPassengers: null,
  },
  cartShoppings: [],
  flightsHistory: [],
};
