import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  EMPTY, buffer, catchError, map, mergeAll, mergeMap, scan, switchAll, switchMap,
} from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
// import { AuthResponseLight } from 'src/app/core/models/interface';
import { checkRequestUser, getRequestUser } from '../actions/state.actions';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  constructor(
    private actions$: Actions,
    private checkUser: AuthService,
  ) {}

  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(checkRequestUser),
    mergeMap(() => this.checkUser.getUser()),
    // catchError(() => EMPTY),
    map((result) => getRequestUser({ currentUser: result })),
  ));
}
