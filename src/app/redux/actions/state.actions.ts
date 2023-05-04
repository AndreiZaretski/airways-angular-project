import { createAction, props } from '@ngrx/store';
import { AuthResponseLight } from 'src/app/core/models/interface';
import { IAirResponse } from 'src/app/shared/models/interfaces';
import { ISearchMainState } from '../state/state.model';

export const getRequestUser = createAction(
  '[USER] Get get user',
  props<{ currentUser: AuthResponseLight,
  }>(),
);

export const checkRequestUser = createAction(
  '[USER] Check get user',
);

export const updateMainState = createAction(
  '[Main] update main state',
  props<{ newState: ISearchMainState,
  }>(),

);

export const updateAirsData = createAction(
  '[Air] update air state',
  props<{ newAirsData: IAirResponse,
  }>(),
);
