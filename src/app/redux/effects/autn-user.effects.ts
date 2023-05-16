import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  exhaustMap, map, mergeMap, of, switchMap,
} from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { GetAirDataService } from 'src/app/core/services/get-air-data.service';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import {
  addOrderCart,
  checkRequestUser, checkCart, deleteOrderCart, getRequestUser,
  replaceOrderCart, updateOrderCart,
  updateAirsData, updateMainState, updatePassengersCount,
  updateUserSettingCurrency, updateUserSettingDateFormat, updateUserSettings,
} from '../actions/state.actions';
import {
  selectCartPage, selectOrderId, selectUserSettings,
} from '../selectors/state.selector';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  constructor(
    private actions$: Actions,
    private checkUser: AuthService,
    private airData: GetAirDataService,
    private store: Store,
  ) {}

  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(checkRequestUser),
    mergeMap(() => this.checkUser.getUser()),
    switchMap((result) => {
      if (result.orders && result.userSettings) {
        return of(
          getRequestUser({ currentUser: result }),
          updateOrderCart({ newOrders: result.orders }),
          updateUserSettings({ newSettinggs: result.userSettings }),
        );
      }

      if (result.orders && !result.userSettings) {
        return of(
          getRequestUser({ currentUser: result }),
          updateOrderCart({ newOrders: result.orders }),
        );
      }

      if (!result.orders && result.userSettings) {
        return of(
          getRequestUser({ currentUser: result }),
          updateUserSettings({ newSettinggs: result.userSettings }),
        );
      }
      return of(
        getRequestUser({ currentUser: result }),
      );
    }),
  ));

  updateCartUserAfterLogin$ = createEffect(() => this.actions$.pipe(
    ofType(getRequestUser),
    map((result) => {
      if (result.currentUser.orders) {
        return updateOrderCart({ newOrders: result.currentUser.orders });
      }
      return { type: 'NO_ACTION' };
    }),
  ), { dispatch: true });

  updateUserSettingsAfterLogin$ = createEffect(() => this.actions$.pipe(
    ofType(getRequestUser),
    map((result) => {
      if (result.currentUser.userSettings) {
        return updateUserSettings({ newSettinggs: result.currentUser.userSettings });
      }
      return { type: 'NO_ACTION' };
    }),
  ), { dispatch: true });

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

  getAirResponse$ = createEffect(() => this.actions$.pipe(
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

  checkCart$ = createEffect(() => this.actions$.pipe(
    ofType(checkCart),
    mergeMap(() => this.store.select(selectOrderId)),
    map((result) => {
      if (result) {
        return replaceOrderCart({ OrderId: result });
      }

      return addOrderCart({ newOrderId: uuidv4() });
    }),

  ));

  sendUserData$ = createEffect(() => this.actions$.pipe(
    ofType(replaceOrderCart, addOrderCart, deleteOrderCart),
    exhaustMap(() => this.store.select(selectCartPage)),
    map((result) => {
      this.checkUser.updateUserData(result)?.subscribe();
    }),
  ), { dispatch: false });

  sendUserSettings$ = createEffect(() => this.actions$.pipe(
    ofType(updateUserSettingCurrency, updateUserSettingDateFormat),
    exhaustMap(() => this.store.select(selectUserSettings)),
    map((result) => this.checkUser.updateUserSettings(result)?.subscribe()),
  ), { dispatch: false });
}
