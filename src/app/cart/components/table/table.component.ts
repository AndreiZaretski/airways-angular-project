import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit, Component, DoCheck, EventEmitter, OnInit, Output, ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, ObjectUnsubscribedError, Observable } from 'rxjs';
import { checkCart, deleteOrderCart } from 'src/app/redux/actions/state.actions';
import { selectOrderId } from 'src/app/redux/selectors/state.selector';
import { selectCartPage } from 'src/app/redux/selectors/state.selector';
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

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  cart$: IBookingPage[] = [];

  dataSource = new MatTableDataSource(this.cart$);


  constructor(
    private liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private store: Store,
  ) {
    this.store.pipe(select(selectCartPage)).subscribe(cart => {
      this.cart$ = cart
      this.selection.clear();
    })
  }

  ngOnInit(): void {

    this.isVisibleInCart = this.isVisibleColumnInCart();
    this.flightsColumns = this.isVisibleInCart
    ? this.flightsInCart
    : this.flightsHistory;
  }

  isVisibleColumnInCart() {
    return this.router.url.split('/').pop() === 'cart';
  }

  ngDoCheck(): void {
    this.dataSource = new MatTableDataSource(this.cart$);
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

  editFlightDetails() {
    this.router.navigateByUrl(`${Path.Booking}`);
  }

  deleteFlight(id: string): void {
    this.store.dispatch(deleteOrderCart({ OrderId: id }));
  }
}
