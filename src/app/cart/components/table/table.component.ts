import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ResultFlightSumService } from 'src/app/core/services/result-flight-sum.service';
import { StepperService } from 'src/app/core/services/stepper-service.service';
import {
  checkRequestUser,
  deleteOrderCart,
  replaceOrderCart,
  watchDetailsOrder,
} from 'src/app/redux/actions/state.actions';
import {
  selectUserSettings,
  selectCartPage,
  selectCartPageHistory,
} from 'src/app/redux/selectors/state.selector';
import { Path } from 'src/app/shared/enums/router.enum';
import { IBookingPage } from 'src/app/shared/models/interface-user-booking';

export interface PeriodicElement {
  position: string;
  flight: string;
  typeTrip: string;
  dataType: string;
  passengers: string;
  price: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, DoCheck, AfterViewInit {
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

  private subscriptionUserSettings: Subscription;

  constructor(
    public stepper: StepperService,
    private liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private store: Store,
    private resultFlightSumService: ResultFlightSumService,
  ) {
    this.store.select(selectCartPage).subscribe((cart) => {
      this.cart$ = cart;
      this.selection.clear();
    });
    this.store.select(selectCartPageHistory).subscribe((pageHistory) => {
      this.pageHistory$ = pageHistory;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(checkRequestUser());

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
      this.isVisibleInCart ? this.cart$ : this.pageHistory$,
    );
    this.selectedFlights.emit(this.selection.selected);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
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
    this.store.dispatch(replaceOrderCart({ OrderId: id }));
    this.router.navigateByUrl(`${Path.Booking}/${Path.Flights}`);
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
}
