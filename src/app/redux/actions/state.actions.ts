import { createAction, props } from '@ngrx/store';
import { AuthResponseLight } from 'src/app/core/models/interface';
import { IAirResponse, ISearchForm } from 'src/app/shared/models/interfaces';
import { IPassengers } from 'src/app/main/model/search-form.model';
// import { ISearchMainState } from '../state/state.model';

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
  props<{
    newSearchForm: ISearchForm,
    newPassengerOptions: IPassengers[]
    ,
  }>(),

);

export const updateAirsData = createAction(
  '[Air] update air state',
  props<{ newAirsData: IAirResponse,
  }>(),
);
