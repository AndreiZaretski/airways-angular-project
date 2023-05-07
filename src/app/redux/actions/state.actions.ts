import { createAction, props } from '@ngrx/store';
import { AuthResponseLight } from 'src/app/core/models/interface';
import { IAirResponse, ISearchForm } from 'src/app/shared/models/interfaces';
import { IPassengers } from 'src/app/main/model/search-form.model';
import { IChooseData, IPassengersCount, IUserPassengers } from 'src/app/shared/models/interface-user-booking';
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

export const updatePassengersCount = createAction(
  '[Passengers] update passengers',
  props<{ newPassengersCount: IPassengersCount,
  }>(),
);

export const updateChooseData = createAction(
  '[Passengers] update choose data',
  props<{ newChooseData: IChooseData,
  }>(),
);

export const updateChooseChekedFrom = createAction(
  '[Passengers] update choose checked data from',

);

export const updateChooseChekedTo = createAction(
  '[Passengers] update choose checked data to',
);

export const updateChooseChekedToBack = createAction(
  '[Passengers] update choose checked data to back',
);

export const updateChooseChekedFromBack = createAction(
  '[Passengers] update choose checked data from back',

);

export const updatePassengersInfo = createAction(
  '[Passengers] update passengers info',
  props<{ newPassengersInfo: IUserPassengers,
  }>(),
);
