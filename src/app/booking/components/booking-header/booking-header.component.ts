import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-header',
  templateUrl: './booking-header.component.html',
  styleUrls: ['./booking-header.component.scss'],
})
export class BookingHeaderComponent {
  isHeaderVertical = false;

  constructor(private responsive: BreakpointObserver) {}

  ngOnInit(): void {
    this.responsive.observe(Breakpoints.XSmall).subscribe((result) => {
      this.isHeaderVertical = false;
      if (result.matches) {
        this.isHeaderVertical = true;
      }
    });
  }
}
