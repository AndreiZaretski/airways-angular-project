import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  EMPTY, buffer, catchError, map, mergeAll, mergeMap, scan, switchAll, switchMap,
} from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
// import { AuthResponseLight } from 'src/app/core/models/interface';
import { GetAirDataService } from 'src/app/core/services/get-air-data.service';
import {
  checkRequestUser, getRequestUser, updateAirsData, updateMainState, updatePassengersCount,
} from '../actions/state.actions';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  constructor(
    private actions$: Actions,
    private checkUser: AuthService,
    private airData: GetAirDataService,
  ) {}

  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(checkRequestUser),
    mergeMap(() => this.checkUser.getUser()),
    // catchError(() => EMPTY),
    map((result) => getRequestUser({ currentUser: result })),
  ));

  writeCountPassengers$ = createEffect(() => this.actions$.pipe(
    ofType(updateMainState),
    map((result) => updatePassengersCount({
      newPassengersCount: {
        adult: result.newPassengerOptions[0].count as number,
        child: result.newPassengerOptions[1].count as number,
        infant: result.newPassengerOptions[2].count as number,
      },
    })),

  ));

  getAirResponse = createEffect(() => this.actions$.pipe(
    ofType(updateMainState),
    mergeMap((result) => this.airData.getAirsData({
      from: result.newSearchForm.route.fromLocation,
      to: result.newSearchForm.route.toLocation,
      way: result.newSearchForm.way,
      endDate: result.newSearchForm.endDate,
      startDate: result.newSearchForm.startDate,
      passengersCount: result.newPassengerOptions
        .reduce((sum, el): number => sum + (el.count as number), 0),
    })),
    map((result) => updateAirsData({ newAirsData: result })),

  ));
}

// const airRequest = {
//   from: this.route?.value['fromLocation'] as string,
//   to: this.route?.value['toLocation'] as string,
//   way: this.searchForm.value.way as string,
//   endDate: String(this.endDate?.value),
//   startDate: String(this.startDate?.value),
//   passengersCount: this.passengerOptions
//     .reduce((sum, el): number => sum + (el.count as number), 0),
// };

// {
//   adult: this.passengerOptions[0].count as number,
//   child: this.passengrOptions[1].count as number,
//   infant: this.passengerOptions[2].count as number,
// }
