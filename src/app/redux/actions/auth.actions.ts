import { createAction, props } from '@ngrx/store';
import { AuthResponseLight } from 'src/app/core/models/interface';

export const getRequestUser = createAction(
  '[USER] Get get user',
  props<{ currentUser: AuthResponseLight,
  }>(),
);

export const checkRequestUser = createAction(
  '[USER] Check get user',
);
