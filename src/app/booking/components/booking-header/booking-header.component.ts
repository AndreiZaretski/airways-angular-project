import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAirResponse, selectPassengersCount } from 'src/app/redux/selectors/state.selector';
import { EditPanelService } from 'src/app/shared/services/edit-panel.service';

@Component({
  selector: 'app-booking-header',
  templateUrl: './booking-header.component.html',
  styleUrls: ['./booking-header.component.scss'],
})
export class BookingHeaderComponent implements OnInit, OnDestroy {
  isHeaderVertical = false;

  passengersOptions$ = this.store.select(selectPassengersCount);

  responseDetails$ = this.store.select(selectAirResponse);

  private subscriptionBreakpoints: Subscription;

  constructor(
    private responsive: BreakpointObserver,
    private store: Store,
    public router: Router,
    public editPanelService: EditPanelService,
  ) {}

  ngOnInit(): void {
    this.subscriptionBreakpoints = this.responsive
      .observe(Breakpoints.XSmall).subscribe((result) => {
        this.isHeaderVertical = false;
        if (result.matches) {
          this.isHeaderVertical = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscriptionBreakpoints.unsubscribe();
  }
}
