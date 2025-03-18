import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  DoCheck,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ResultFlightSumService } from 'src/app/core/services/result-flight-sum.service';
import { StepperService } from 'src/app/core/services/stepper-service.service';
import {
  deleteOrderCart,
  editOrderCart,
  watchDetailsOrder,
} from 'src/app/redux/actions/state.actions';
import {
  selectUserSettings,
  selectCartPage,
  selectCartPageHistory,
  selectUserSettingsDateFormat,
} from 'src/app/redux/selectors/state.selector';
import { DateFormat } from 'src/app/shared/enums/date.enum';
import { Path } from 'src/app/shared/enums/router.enum';
import { IBookingPage } from 'src/app/shared/models/interface-user-booking';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, DoCheck, OnDestroy {
  @Output() selectedFlights = new EventEmitter<IBookingPage[]>();

  flightsInCart: string[] = [
    'select',
    'position',
    'flight',
    'typeTrip',
    'dataType',
    'passengers',
    'price',
    'actionMenu',
  ];

  flightsHistory: string[] = [
    'position',
    'flight',
    'typeTrip',
    'dataType',
    'passengers',
    'price',
  ];

  selection = new SelectionModel<IBookingPage>(true, []);

  flightsColumns: string[] = [];

  isVisibleInCart = false;

  path = Path;

  userCurrency: string;

  userSettings$ = this.store.select(selectUserSettings);

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  cart$: IBookingPage[] = [];

  dataSource = new MatTableDataSource<IBookingPage>([]);

  pageHistory$: IBookingPage[] = [];

  formatDate$: Observable<DateFormat>;

  formatDate = DateFormat.MDY;

  sortType = 'typeTrip';

  sortDirection = 'asc';

  private subscriptionUserSettings: Subscription;

  private subscriptionOnCart$: Subscription;

  private subscriptionOnHistory$: Subscription;

  constructor(
    public stepper: StepperService,
    private liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private store: Store,
    private resultFlightSumService: ResultFlightSumService,
  ) {
    // eslint-disable-next-line @ngrx/no-store-subscription
    this.subscriptionOnCart$ = this.store.select(selectCartPage).subscribe((cart) => {
      this.cart$ = cart;
      this.selection.clear();
    });
    this.subscriptionOnHistory$ = this.store.select(selectCartPageHistory)
    // eslint-disable-next-line @ngrx/no-store-subscription
      .subscribe((pageHistory) => {
        this.pageHistory$ = pageHistory;
      });

    this.formatDate$ = this.store.select(selectUserSettingsDateFormat);
  }

  ngOnInit(): void {
    this.formatDate$ = this.store.select(selectUserSettingsDateFormat);

    this.isVisibleInCart = this.isVisibleColumnInCart();
    this.flightsColumns = this.isVisibleInCart
      ? this.flightsInCart
      : this.flightsHistory;

    this.subscriptionUserSettings = this.userSettings$.subscribe(
      (res) => (this.userCurrency = res.currency),
    );
  }

  isVisibleColumnInCart() {
    return this.router.url.split('/').pop() === 'cart';
  }

  ngDoCheck(): void {
    this.dataSource = new MatTableDataSource(
      this.isVisibleInCart
        ? this.dataSort(this.cart$)
        : this.dataSort(this.pageHistory$),
    );
    this.selectedFlights.emit(this.selection.selected);
  }

  compare(a: string | number, b: string | number, isAsc: boolean): number {
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b) * (isAsc ? 1 : -1);
    }
    if (typeof a === 'number' && typeof b === 'number') {
      return (a - b) * (isAsc ? 1 : -1);
    }
    return 0;
  }

  dataSort(data: IBookingPage[]) {
    const sortedData = [...data];
    return sortedData.sort((a, b) => {
      const isAsc = this.sortDirection === 'asc';
      if (a.responseAir && b.responseAir) {
        switch (this.sortType) {
          case 'position':
            return this.compare(
              a.responseAir?.thereWay[a.indexThereWay]?.flightNumber,
              b.responseAir?.thereWay[b.indexThereWay]?.flightNumber,
              isAsc,
            );
          case 'flight':
            return this.compare(
              a.responseAir?.from,
              b.responseAir?.from,
              isAsc,
            );
          case 'typeTrip':
            return this.compare(a.responseAir?.way, b.responseAir?.way, isAsc);
          case 'dataType':
            return this.compare(
              a.responseAir.startDate,
              b.responseAir.startDate,
              isAsc,
            );
          case 'price':
            return this.compare(
              this.getTotalSum(a, this.userCurrency),
              this.getTotalSum(b, this.userCurrency),
              isAsc,
            );
          default:
            return 0;
        }
      }
      return 0;
    });
    return sortedData;
  }

  announceSortChange(sortState: Sort) {
    this.sortType = sortState.active;
    this.sortDirection = sortState.direction;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach((row) => this.selection.select(row));
    }
  }

  editFlightDetails(id: string) {
    this.store.dispatch(editOrderCart({ OrderId: id }));
    this.router.navigateByUrl(`${Path.Booking}/${Path.Passengers}`);
  }

  deleteFlight(id: string): void {
    this.store.dispatch(deleteOrderCart({ OrderId: id }));
  }

  showFlightDetails(id: string) {
    // this.stepper.lastStep();
    this.store.dispatch(watchDetailsOrder({ OrderId: id }));
    this.router.navigateByUrl(`/${Path.Booking}/${Path.Summary}`);
  }

  getTotalSum(flight: IBookingPage, userCurrency: string) {
    return this.resultFlightSumService.calculateTotalSum(flight, userCurrency);
  }

  ngOnDestroy() {
    this.subscriptionOnCart$.unsubscribe();
    this.subscriptionOnHistory$.unsubscribe();
  }
}
