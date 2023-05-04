import { createFeatureSelector, createSelector } from '@ngrx/store';
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

export const selectAirResponseState = createFeatureSelector<IState>('airResponse');

export const selectAirResponse = createSelector(
  selectAirResponseState,
  (state) => state.airResponse,
);
