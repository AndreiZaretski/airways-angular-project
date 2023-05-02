import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from '../state/state.model';

export const selectAuthState = createFeatureSelector<IAuthState>('authState');

export const selectAuthCards = createSelector(
  selectAuthState,
  (state) => state.authState,
);
