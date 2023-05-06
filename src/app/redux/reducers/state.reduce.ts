import { createReducer, on } from '@ngrx/store';
import { StateInit, UserBookingStateInit } from '../state/state.model';
import {
  // eslint-disable-next-line max-len, @typescript-eslint/no-unused-vars
  getRequestUser, updateAirsData, updateChooseChekedFrom, updateChooseChekedTo, updateChooseData, updateMainState, updatePassengersCount, updatePassengersInfo,
} from '../actions/state.actions';

// export const youTubeCardsReducer = createReducer(
//   AppStateInit,
//   on(
//     getSearchCards,
//     (state, { searchResult }) => ({
//       ...state,
//       youTubeCards: [...searchResult],
//     }),
//   ),
// );

// export const customCardsReducer = createReducer(
//   AppStateInit,
//   on(
//     getCustomCard,
//     (state, { customCard }) => ({
//       ...state,
//       customCards: [...state.customCards, customCard],
//     }),
//   ),
// );

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
    updatePassengersInfo,
    (state, { newPassengersInfo }) => ({
      ...state,
      userPassengers: newPassengersInfo,
    }),
  ),
);
