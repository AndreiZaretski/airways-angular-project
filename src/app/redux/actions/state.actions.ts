import { createAction, props } from '@ngrx/store';
import { AuthResponseLight, IUserSettings } from 'src/app/shared/models/interface-users';
import { IAirResponse, ISearchForm } from 'src/app/shared/models/interfaces';
import { IPassengers } from 'src/app/main/model/search-form.model';
import {
  IBookingPage, IPassengersCount, IUserPassengers,
} from 'src/app/shared/models/interface-user-booking';
import { Currency } from 'src/app/shared/enums/currency.enum';
import { DateFormat } from 'src/app/shared/enums/date.enum';
// import { ISearchMainState } from '../state/state.model';

export const getRequestUser = createAction(
  '[USER] Get get user',
  props<{ currentUser: AuthResponseLight,
  }>(),
);

export const checkRequestUser = createAction(
  '[USER] Check get user',
);

export const updateUserSettingCurrency = createAction(
  '[USER Settings] update User Setting Currency',
  props<{ newCurrency: Currency,
  }>(),
);

export const updateUserSettingDateFormat = createAction(
  '[USER Settings] update User Setting Date Format',
  props<{ newDateFormat: DateFormat,
  }>(),
);

export const updateUserSettings = createAction(
  '[USER Settings] update User Settings',
  props<{ newSettinggs: IUserSettings,
  }>(),
);

export const updateMainState = createAction(
  '[Main] update main state',
  props<{
    newSearchForm: ISearchForm,
    newPassengerOptions: IPassengers[]
    ,
  }>(),

);

export const updateAirsData = createAction(
  '[Air] update air state',
  props<{ newAirsData: IAirResponse,
  }>(),
);

export const updateBookingPageToInitState = createAction(
  '[Passengers] update Booking Page To Init State',
);

export const updatePassengersCount = createAction(
  '[Passengers] update passengers',
  props<{ newPassengersCount: IPassengersCount,
  }>(),
);

export const updateIndexThereWay = createAction(
  '[Passengers] update index There Way',
  props<{ newIndexThereWay: number,
  }>(),
);

export const updateIndexBackWay = createAction(
  '[Passengers] update index Back Way',
  props<{ newIndexBackWay: number,
  }>(),
);

export const updateChooseChekedThereWay = createAction(
  '[Passengers] update choose checked data There Way',

);

export const updateChooseChekedBackWay = createAction(
  '[Passengers] update choose checked data Back Way',
);

export const updateChooseChekedBackWayEdit = createAction(
  '[Passengers] update choose checked data to Back Way Edit',
);

export const updateChooseChekedThereWayEdit = createAction(
  '[Passengers] update choose checked data from There Way Edit',

);

export const updatePassengersInfo = createAction(
  '[Passengers] update passengers info',
  props<{ newPassengersInfo: IUserPassengers,
  }>(),
);

export const addOrderCart = createAction(
  '[Cart] add order',
  props<{ newOrderId: string,
  }>(),
);

export const checkCart = createAction(
  '[Cart] check order',
);

export const replaceOrderCart = createAction(
  '[Cart] replace order',
  props<{ OrderId: string,
  }>(),
);

export const deleteOrderCart = createAction(
  '[Cart] delete order',
  props<{ OrderId: string,
  }>(),
);

export const editOrderCart = createAction(
  '[Cart] edit order',
  props<{ OrderId: string,
  }>(),
);

export const watchDetailsOrder = createAction(
  '[Cart] watch details order',
  props<{ OrderId: string,
  }>(),
);

export const updateOrderCart = createAction(
  '[Cart] send orders',
  props<{ newOrders: IBookingPage[],
  }>(),
);

export const addToFlightsHistory = createAction(
  '[FlightsHistory] add flights to history',
  props<{ newBoughtFlights: IBookingPage[] }>(),
);

export const updateFlightsHistory = createAction(
  '[FlightsHistory] update flight history',
  props<{ newBoughtFlights: IBookingPage[],
  }>(),
);
