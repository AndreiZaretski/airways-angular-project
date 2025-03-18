/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRouteSnapshot, CanActivate, CanLoad,
  Route, Router, RouterStateSnapshot, UrlSegment, UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPassengersInfo, selectUserBooking } from 'src/app/redux/selectors/state.selector';
import { IUserPassengers } from 'src/app/shared/models/interface-user-booking';
import { Path } from 'src/app/shared/enums/router.enum';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SummaryGuard implements CanActivate, CanLoad {
  passangersInfo: IUserPassengers | null;

  constructor(
    private router: Router,
    private authServise: AuthService,
    private store: Store,
    public dialog: MatDialog,
  ) {
    // eslint-disable-next-line @ngrx/no-store-subscription
    this.store.select(selectPassengersInfo).subscribe((res) => {
      this.passangersInfo = res;
    });
    // this.currentUser = this.authServise.checkUser();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.passangersInfo) { return true; }
    this.router.navigate([Path.Booking, Path.Flights]);
    return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.passangersInfo) { return true; }
    this.router.navigate([Path.Booking, Path.Flights]);
    return false;
  }
}
