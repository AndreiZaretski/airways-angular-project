import { Injectable } from '@angular/core';
import {
  Actions, concatLatestFrom, createEffect, ofType,
} from '@ngrx/effects';
import {
  debounceTime,
  exhaustMap, iif, map, mergeMap, of, switchMap,
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
  updateUserSettingCurrency, updateUserSettingDateFormat,
  updateUserSettings, updateFlightsHistory, updateIndexBackWay, updateIndexThereWay,
} from '../actions/state.actions';
import {
  selectCartPage, selectCartPageHistory, selectOrderId, selectUserSettings,
} from '../selectors/state.selector';

function notNull<T>(value: T | null): value is T {
  return value !== null;
}

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
          updateOrderCart({ newOrders: result.orders.cartShoppings }),
          updateFlightsHistory({ newBoughtFlights: result.orders.flightsHistory }),
          updateUserSettings({ newSettinggs: result.userSettings }),
        );
      }

      if (result.orders && !result.userSettings) {
        return of(
          getRequestUser({ currentUser: result }),
          updateOrderCart({ newOrders: result.orders.cartShoppings }),
          updateFlightsHistory({ newBoughtFlights: result.orders.flightsHistory }),
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
        return updateOrderCart({ newOrders: result.currentUser.orders.cartShoppings });
      }
      return { type: 'NO_ACTION' };
    }),
  ), { dispatch: true });

  updateCartUserHistoryAfterLogin$ = createEffect(() => this.actions$.pipe(
    ofType(getRequestUser),
    map((result) => {
      if (result.currentUser.orders) {
        return updateFlightsHistory({
          newBoughtFlights:
          result.currentUser.orders.flightsHistory,
        });
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

  updateIndexes$ = createEffect(() => this.actions$.pipe(
    ofType(updateMainState),
    mergeMap(() => [
      updateIndexThereWay({ newIndexThereWay: 3 }),
      updateIndexBackWay({ newIndexBackWay: 3 }),
    ]),
  ));

  checkCart$ = createEffect(() => this.actions$.pipe(
    ofType(checkCart),
    concatLatestFrom(() => this.store.select(selectOrderId)),
    mergeMap(([, orderId]) => iif(
      () => notNull(orderId),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      of(replaceOrderCart({ OrderId: orderId! })),
      of(addOrderCart({ newOrderId: uuidv4() })),
    )),
  ));

  sendUserData$ = createEffect(() => this.actions$.pipe(
    ofType(replaceOrderCart, addOrderCart, deleteOrderCart),
    debounceTime(1000),
    concatLatestFrom(() => [
      this.store.select(selectCartPage),
      this.store.select(selectCartPageHistory),
    ]),
    map(([, cartPage, cartPageHistory]) => {
      this.checkUser.updateUserData(cartPage, cartPageHistory)?.subscribe();
    }),
  ), { dispatch: false });

  sendUserSettings$ = createEffect(() => this.actions$.pipe(
    ofType(updateUserSettingCurrency, updateUserSettingDateFormat),
    exhaustMap(() => this.store.select(selectUserSettings)),
    map((result) => this.checkUser.updateUserSettings(result)?.subscribe()),
  ), { dispatch: false });
}
