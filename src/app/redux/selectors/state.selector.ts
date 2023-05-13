import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserBooking } from 'src/app/shared/models/interface-user-booking';
import { IState } from '../state/state.model';

export const selectAuthState = createFeatureSelector<IState>('authState');

export const selectAuthCards = createSelector(
  selectAuthState,
  (state) => state.authState,
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

export const selectUserBoking = createSelector(
  selectAirResponseState,
  (state) => state.bookingPage,
);

export const selectCartPage = createSelector(
  selectAirResponseState,
  (state) => state.cartShoppings,
);

export const selectAirResponse = createSelector(
  selectUserBoking,
  (state) => state.responseAir,
);

export const selectOrderId = createSelector(
  selectUserBoking,
  (state) => state.orderId,
);

export const selectChooseData = createSelector(
  selectUserBoking,
  (state) => state.chooseData,
);

export const selectIndexFrom = createSelector(
  selectUserBoking,
  (state) => state.indexFrom,
);

export const selectIndexTo = createSelector(
  selectUserBoking,
  (state) => state.indexTo,
);

export const selectPassengersInfo = createSelector(
  selectUserBoking,
  (state) => state.userPassengers,
);

export const selectPassengersCount = createSelector(
  selectUserBoking,
  (state) => state.passengersCount,
);
