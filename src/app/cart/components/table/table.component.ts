import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit, Component, DoCheck, EventEmitter, OnInit, Output, ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Path } from 'src/app/shared/enums/router.enum';

export interface PeriodicElement {
  position: string;
  flight: string;
  typeTrip: string;
  dataType: string;
  passengers: string;
  price: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 'FR 1925',
    flight: 'Dublin - Warsaw',
    typeTrip: 'Round trip',
    dataType: '1 Mar 2023, 8:40 - 12:00',
    passengers: '1 x Adult',
    price: 234.55,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 205.78,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
  {
    position: 'FR 1936',
    flight: 'Gdansk - Warsaw',
    typeTrip: 'One way',
    dataType: '21 Mar 2023, 15:40 - 16:40',
    passengers: '1 x Adult',
    price: 200,
  },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, DoCheck, AfterViewInit {
  @Output() selectedFlights = new EventEmitter<PeriodicElement[]>();

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

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  selection = new SelectionModel<PeriodicElement>(true, []);

  flightsColumns: string[] = [];

  isVisibleInCart = false;

  path = Path;

  constructor(
    private liveAnnouncer: LiveAnnouncer,
    private router: Router,
  ) {}

  @ViewChild(MatSort) sort: MatSort = new MatSort();

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
}
