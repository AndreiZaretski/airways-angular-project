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

export const selectAirResponseState = createFeatureSelector<IState>('userBoking');

export const selectUserBoking = createSelector(
  selectAirResponseState,
  (state) => state.userBoking,
);

export const selectAirResponse = createSelector(
  selectUserBoking,
  (state) => state?.responseAir,
);

export const selectChooseData = createSelector(
  selectUserBoking,
  (state) => state?.chooseData,
);

// export const selectBookingPageData = createSelector(
//   selectSearchPassengers,
//   selectAirResponseState,
//   (state) => state,

// );
