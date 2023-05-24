import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component, Input, OnChanges, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Subscription } from 'rxjs';
import {
  updateChooseChekedBackWay,
  updateChooseChekedBackWayEdit,
  updateChooseChekedThereWay,
  updateChooseChekedThereWayEdit,
  updateIndexBackWay,
  updateIndexThereWay,
} from 'src/app/redux/actions/state.actions';
import { selectUserBooking, selectUserSettings } from 'src/app/redux/selectors/state.selector';
import { IAirResponse } from 'src/app/shared/models/interfaces';
import { SequenceDatePipe } from 'src/app/shared/pipes/sequence-date.pipe';

@Component({
  selector: 'app-flights-selection-item',
  templateUrl: './flights-selection-item.component.html',
  styleUrls: ['./flights-selection-item.component.scss'],
})
export class FlightsSelectionItemComponent implements OnInit, OnChanges, OnDestroy {
  @Input() index: number;

  @Input() response: IAirResponse;

  @Input() source: string;

  @ViewChild('slickModalDate')
    slickModalDate: SlickCarouselComponent;

  @ViewChild('slickModal')
    slickModal: SlickCarouselComponent;

  checkedThereWay = false;

  checkedBackWay = false;

  flightCardConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 3,
    infinite: false,
    draggable: false,
    arrows: false,
    dots: false,
  };

  flightCardConfigBack = {
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 3,
    infinite: false,
    draggable: false,
    arrows: false,
    dots: false,
  };

  indexThereWay: number;

  indexBackWay: number;

  isFlightCardVertical = false;

  isFlightDetailsVertical = false;

  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 3,
    infinite: false,
    draggable: false,
    arrows: true,
    dots: false,
    centerMode: true,
    centerPadding: '0px',
    focusOnSelect: true,
    asNavFor: '.flight-carousel',
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
  };

  slideConfigBack = {
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 3,
    infinite: false,
    draggable: false,
    arrows: true,
    dots: false,
    centerMode: true,
    centerPadding: '0px',
    focusOnSelect: true,
    asNavFor: '.backway-carousel',
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
  };

  today = new Date(new Date().setHours(0, 0, 0, 0));

  userBooking$ = this.store.select(selectUserBooking);

  userCurrency: string;

  userSettings$ = this.store.select(selectUserSettings);

  private subscriptionBreakpoints: Subscription;

  private subscriptionUserBooking: Subscription;

  private subscriptionUserSettings: Subscription;

  constructor(private store: Store, private responsive: BreakpointObserver) {}

  ngOnInit(): void {
    this.subscriptionUserBooking = this.userBooking$.subscribe((res) => {
      this.checkedThereWay = res.checkedThereWay;
      this.checkedBackWay = res.checkedBackWay;
      this.indexThereWay = res.indexThereWay;
      this.indexBackWay = res.indexBackWay;
    });

    this.setCarouselIndex();

    this.subscriptionUserSettings = this.userSettings$
      .subscribe((res) => this.userCurrency = res.currency);

    this.subscriptionBreakpoints = this.responsive.observe(
      [Breakpoints.XSmall, Breakpoints.Small],
    ).subscribe((result) => {
      const { breakpoints } = result;
      this.isFlightCardVertical = false;
      this.isFlightDetailsVertical = false;

      if (breakpoints[Breakpoints.Small] || breakpoints[Breakpoints.XSmall]) {
        this.isFlightCardVertical = true;
      }

      if (breakpoints[Breakpoints.XSmall]) {
        this.isFlightDetailsVertical = true;
      }
    });
  }

  clickSlider(e: Event, startDate: string, index: number): void {
    const sequencePipe = new SequenceDatePipe();
    const slideDate = sequencePipe.transform(startDate, index);

    if (slideDate < this.today) {
      e.stopImmediatePropagation();
    }
  }

  editSelection(): void {
    if (this.source !== 'backway') {
      this.store.dispatch(updateChooseChekedThereWayEdit());
    } else {
      this.store.dispatch(updateChooseChekedBackWayEdit());
    }
  }

  ngOnChanges(): void {
    if (this.slickModalDate && !this.slickModalDate.initialized) {
      this.slickModalDate.initSlick();
    } else if (this.slickModalDate) {
      this.slickModalDate.unslick();
    }

    if (this.slickModal && !this.slickModal.initialized) {
      this.slickModal.initSlick();
    } else if (this.slickModal) {
      this.slickModal.unslick();
    }

    this.setCarouselIndex();
  }

  ngOnDestroy(): void {
    this.subscriptionUserBooking.unsubscribe();
    this.subscriptionUserSettings.unsubscribe();
    this.subscriptionBreakpoints.unsubscribe();
  }

  selectFlight(i: number): void {
    if (this.source !== 'backway') {
      this.store.dispatch(updateChooseChekedThereWay());
      this.store.dispatch(updateIndexThereWay({ newIndexThereWay: i }));
    } else {
      this.store.dispatch(updateChooseChekedBackWay());
      this.store.dispatch(updateIndexBackWay({ newIndexBackWay: i }));
    }
  }

  private setCarouselIndex(): void {
    this.slideConfig.initialSlide = this.indexThereWay;
    this.flightCardConfig.initialSlide = this.indexThereWay;

    if (this.response.backWay) {
      if (this.checkedBackWay) {
        this.slideConfigBack.initialSlide = this.indexBackWay;
        this.flightCardConfigBack.initialSlide = this.indexBackWay;
      } else {
        this.slideConfigBack.initialSlide = this.response.backWay.length - 4;
        this.flightCardConfigBack.initialSlide = this.response.backWay.length - 4;
      }
    }
  }
}
