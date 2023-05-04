import { createReducer, on } from '@ngrx/store';
import { StateInit } from '../state/state.model';
import { getRequestUser, updateAirsData, updateMainState } from '../actions/state.actions';

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
    (state, { newState }) => ({
      ...state,
      searchMainState: newState,
    }),
  ),
);

export const airStateReducer = createReducer(
  StateInit,
  on(
    updateAirsData,
    (state, { newAirsData }) => ({
      ...state,
      airResponse: newAirsData,
    }),
  ),
);
