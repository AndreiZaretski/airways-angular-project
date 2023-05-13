/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Actions, concatLatestFrom, createEffect, ofType,
} from '@ngrx/effects';
import {
  Observable,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  concatMap,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exhaustMap,
  from,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  map, mergeAll, mergeMap, of, switchMap, tap, withLatestFrom,
} from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { GetAirDataService } from 'src/app/core/services/get-air-data.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Action, Store, select } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import {
  addOrderCart,
  checkRequestUser, chekCart, deleteOrderCart, getRequestUser,
  replaceOrderCart, updateOrderCart,
  updateAirsData, updateMainState, updatePassengersCount,
} from '../actions/state.actions';
import { selectCartPage, selectOrderId, selectUserData } from '../selectors/state.selector';
// import { airStateReducer } from '../reducers/state.reduce';
// import { AppState } from '../state/app.state';

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
    // updateOrderCart
    // switchMap((result) => [
    //   getRequestUser({ currentUser: result }),
    //   updateOrderCart({ newOrders: result.orders }),
    // ]),
    // map((result) => updateOrderCart({ newOrders: result })),

    switchMap((result) => {
      if (result.orders) {
        return of(
          getRequestUser({ currentUser: result }),
          updateOrderCart({ newOrders: result.orders }),
        );
      } // if orders do not exist
      return of( // return an observable of one action
        getRequestUser({ currentUser: result }), // only action
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
    ofType(chekCart),
    mergeMap(() => this.store.select(selectOrderId)),
    map((result) => {
      if (result) {
        return replaceOrderCart({ OrderId: result });
      }

      return addOrderCart({ newOrderId: uuidv4() });
    }),

  ));

  // getUserData$ = createEffect(() => this.actions$.pipe(
  //   ofType(replaceOrderCart, addOrderCart, deleteOrderCart),
  //   // tap(() => getOrderCart()),

  // ));

  sendUserData$ = createEffect(() => this.actions$.pipe(
    ofType(replaceOrderCart, addOrderCart, deleteOrderCart),
    exhaustMap(() => this.store.select(selectCartPage)),
    map((result) => {
      // if (result) {
      this.checkUser.updateUserData(result)?.subscribe();
      // }
    }),
  ), { dispatch: false });
}

// map((result)=> this.checkUser.updateUserData(this.store.select(selectUserData)))
// chekCard

// this.checkId$ = this.store.select(selectOrderId).pipe(

//   tap((result) => {
//     if (!result) {
//       this.store.dispatch(addOrderCart({ newOrderId: uuidv4() }));
//       console.log('no');
//     } else {
//       // this.store.dispatch(addOrderCart({ newOrderId: 'fff' }));
//       this.store.dispatch(replaceOrderCart({ OrderId: result }));
//       console.log(result);
//     }
//   }),
// );

// tap((result) => {
//   if (result) {
//     replaceOrderCart({ OrderId: result });
//   }
//   if (!result) {
//     addOrderCart({ newOrderId: uuidv4() });
//   }
// }),
