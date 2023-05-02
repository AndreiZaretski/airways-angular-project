import { createReducer, on } from '@ngrx/store';
import { AuthStateInit } from '../state/state.model';
import { getRequestUser } from '../actions/auth.actions';

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
  AuthStateInit,
  on(
    getRequestUser,
    (state, { currentUser }) => ({
      ...state,
      authState: currentUser,
    }),
  ),
  // on(
  //   getCustomCard,
  //   (state, { customCard }) => ({
  //     ...state,
  //     customCards: [...state.customCards, customCard],
  //   }),
  // ),
);
