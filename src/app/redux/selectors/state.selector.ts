import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserBooking } from 'src/app/shared/models/interface-user-booking';
import { IState } from '../state/state.model';

export const selectAuthState = createFeatureSelector<IState>('authState');

export const selectAuthCards = createSelector(
  selectAuthState,
  (state) => state.authState,
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

export const selectAirResponseState = createFeatureSelector<IUserBooking>('responseAir');

export const selectUserBoking = createSelector(
  selectAirResponseState,
  (state) => state,
);

export const selectAirResponse = createSelector(
  selectUserBoking,
  (state) => state.responseAir,
);

export const selectChooseData = createSelector(
  selectUserBoking,
  (state) => state.chooseData,
);
