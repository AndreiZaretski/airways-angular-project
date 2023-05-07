import { createReducer, on } from '@ngrx/store';
import { StateInit, UserBookingStateInit } from '../state/state.model';
import {
  getRequestUser, updateAirsData, updateChooseChekedFrom,
  updateChooseChekedFromBack, updateChooseChekedTo, updateChooseChekedToBack,
  updateChooseData, updateMainState, updatePassengersCount, updatePassengersInfo,
} from '../actions/state.actions';

export const authReducer = createReducer(
  StateInit,
  on(
    getRequestUser,
    (state, { currentUser }) => ({
      ...state,
      authState: currentUser,
    }),
  ),
);

export const mainStateReducer = createReducer(
  StateInit,
  on(
    updateMainState,
    (state, { newSearchForm, newPassengerOptions }) => ({
      ...state,
      searchMainState: {
        searchForm: newSearchForm,
        passengerOptions: newPassengerOptions,
      },
    }),
  ),
);

export const airStateReducer = createReducer(
  UserBookingStateInit,
  on(
    updateAirsData,
    (state, { newAirsData }) => ({
      ...state,
      responseAir: newAirsData,
    }),
  ),
  on(
    updatePassengersCount,
    (state, { newPassengersCount }) => ({
      ...state,
      passengersCount: newPassengersCount,
    }),
  ),
  on(
    updateChooseData,
    (state, { newChooseData }) => ({
      ...state,
      chooseData: newChooseData,
    }),
  ),

  on(
    updateChooseChekedFrom,
    (state) => ({
      ...state,
      checkedFrom: true,

    }),
  ),

  on(
    updateChooseChekedTo,
    (state) => ({
      ...state,
      checkedTo: true,
    }),
  ),

  on(
    updateChooseChekedFromBack,
    (state) => ({
      ...state,
      checkedFrom: false,

    }),
  ),

  on(
    updateChooseChekedToBack,
    (state) => ({
      ...state,
      checkedTo: false,
    }),
  ),

  on(
    updatePassengersInfo,
    (state, { newPassengersInfo }) => ({
      ...state,
      userPassengers: newPassengersInfo,
    }),
  ),
);
