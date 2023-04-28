import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

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
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'select',
    'position',
    'flight',
    'typeTrip',
    'dataType',
    'passengers',
    'price',
    'actionMenu',
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(private liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort = new MatSort();

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
}
