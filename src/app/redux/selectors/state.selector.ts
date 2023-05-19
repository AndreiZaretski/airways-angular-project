import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserBooking } from 'src/app/shared/models/interface-user-booking';
import { IState } from '../state/state.model';

export const selectAuthState = createFeatureSelector<IState>('authState');

export const selectAuthCards = createSelector(
  selectAuthState,
  (state) => state.authState,
);

export const selectUserSettings = createSelector(
  selectAuthState,
  (state) => state.userSettings,
);

export const selectUserSettingsCurrency = createSelector(
  selectAuthState,
  (state) => state.userSettings.currency,
);

export const selectUserSettingsDateFormat = createSelector(
  selectAuthState,
  (state) => state.userSettings.dateFormat,
);

export const selectUserData = createSelector(
  selectAuthState,
  (state) => state.authState?.orders,
);

export const selectSearchMainState = createFeatureSelector<IState>('searchMainState');

export const selectSearchMain = createSelector(
  selectSearchMainState,
  (state) => state.searchMainState,
);

export const selectSearchPassengers = createSelector(
  selectSearchMain,
  (state) => state.passengerOptions,
);

export const selectAirResponseState = createFeatureSelector<IUserBooking>('userBooking');

export const selectUserBooking = createSelector(
  selectAirResponseState,
  (state) => state.bookingPage,
);

export const selectCartPage = createSelector(
  selectAirResponseState,
  (state) => state.cartShoppings,
);

export const selectCartPageHistory = createSelector(
  selectAirResponseState,
  (state) => state.flightsHistory,
);

export const selectAirResponse = createSelector(
  selectUserBooking,
  (state) => state.responseAir,
);

export const selectOrderId = createSelector(
  selectUserBooking,
  (state) => state.orderId,
);

// export const selectChooseData = createSelector(
//   selectUserBooking,
//   (state) => state.chooseData,
// );

export const selectIndexThereWay = createSelector(
  selectUserBooking,
  (state) => state.indexThereWay,
);

export const selectIndexBackWay = createSelector(
  selectUserBooking,
  (state) => state.indexBackWay,
);

export const selectPassengersInfo = createSelector(
  selectUserBooking,
  (state) => state.userPassengers,
);

export const selectPassengersCount = createSelector(
  selectUserBooking,
  (state) => state.passengersCount,
);
