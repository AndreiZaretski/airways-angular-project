import { createReducer, on } from '@ngrx/store';
import { StateInit } from '../state/state.model';
import {
  // eslint-disable-next-line max-len, @typescript-eslint/no-unused-vars
  getRequestUser, updateAirsData, updateChooseChekedFrom, updateChooseData, updateMainState, updatePassengersCount,
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
  StateInit,
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

  // on(
  //   updateChooseChekedFrom,
  //   (state, { newChooseDataChecked }) => ({
  //     ...state,
  //     chooseData?.dataThere.checked: newChooseDataChecked,

  //   }),
  // ),
);
