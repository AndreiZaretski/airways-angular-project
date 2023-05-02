/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild,
  CanDeactivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Path } from 'src/app/shared/enums/router.enum';
import { selectAuthCards } from 'src/app/redux/selectors/cards.selector';
import { checkRequestUser, getRequestUser } from 'src/app/redux/actions/auth.actions';
import { AuthResponseLight } from '../models/interface';

@Injectable({
  providedIn: 'root',
})
export class GuardGuard implements CanActivate, CanActivateChild,
CanDeactivate<unknown>, CanLoad, CanMatch {
  constructor(private router: Router, private authServise: AuthService, private store: Store) {
    this.store.dispatch(checkRequestUser());
    // eslint-disable-next-line @ngrx/no-store-subscription
    this.store.select(selectAuthCards).subscribe((res) => this.currentUser = res);
  }

  currentUser: AuthResponseLight | null;

  //= this.authServise.getCurrentUser;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.currentUser) { return true; }

    this.router.navigate([Path.Main]);

    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canMatch(
    route: Route,
    segments: UrlSegment[],
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.currentUser) { return true; }
    this.router.navigate([Path.Main]);
    return false;
  }
}
