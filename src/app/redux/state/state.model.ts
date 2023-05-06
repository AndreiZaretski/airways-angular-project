import { AuthResponseLight } from 'src/app/core/models/interface';
import { IPassengers } from 'src/app/main/model/search-form.model';
import { IUserBooking } from 'src/app/shared/models/interface-user-booking';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IAirResponse, ISearchForm } from 'src/app/shared/models/interfaces';

export interface ISearchMainState {
  searchForm: ISearchForm,
  passengerOptions: IPassengers[]
}

export interface IState {
  authState: AuthResponseLight | null,
  searchMainState: {
    searchForm: ISearchForm,
    passengerOptions: IPassengers[]
  },
  // userBoking: IUserBooking | null,
  // airResponse: IAirResponse | null,
}

export const StateInit: IState = {
  authState: null,
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
  // userBoking: {
  //   responseAir: null,
  //   chooseData: null,
  //   passengersCount: null,
  //   userPassengers: null,
  // },
  // airResponse: null,
};

// export interface IUserBookingState {userBoking: IUserBooking, }

export const UserBookingStateInit: IUserBooking = {

  responseAir: null,
  chooseData: null,
  checkedFrom: false,
  checkedTo: false,
  passengersCount: null,
  userPassengers: null,

  // airResponse: null,
};
