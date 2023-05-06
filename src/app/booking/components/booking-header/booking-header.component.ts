import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSearchMain } from 'src/app/redux/selectors/state.selector';

@Component({
  selector: 'app-booking-header',
  templateUrl: './booking-header.component.html',
  styleUrls: ['./booking-header.component.scss'],
})
export class BookingHeaderComponent implements OnInit {
  isHeaderVertical = false;

  headerDetails$ = this.store.select(selectSearchMain);

  constructor(private responsive: BreakpointObserver, private store: Store) {}

  ngOnInit(): void {
    this.responsive.observe(Breakpoints.XSmall).subscribe((result) => {
      this.isHeaderVertical = false;
      if (result.matches) {
        this.isHeaderVertical = true;
      }
    });
  }
}
