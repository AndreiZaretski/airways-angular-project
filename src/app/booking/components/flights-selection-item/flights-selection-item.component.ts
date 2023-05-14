import { Component, Input, OnInit } from '@angular/core';
import { IAirResponse } from 'src/app/shared/models/interfaces';

@Component({
  selector: 'app-flights-selection-item',
  templateUrl: './flights-selection-item.component.html',
  styleUrls: ['./flights-selection-item.component.scss'],
})
export class FlightsSelectionItemComponent implements OnInit {
  @Input() index: number;

  @Input() response: IAirResponse;

  @Input() source: string;

  flightCardConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
    infinite: false,
    draggable: false,
    arrows: false,
    dots: false,
  };

  flightCardConfigBack = {
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
    infinite: false,
    draggable: false,
    arrows: false,
    dots: false,
  };

  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 2,
    infinite: false,
    draggable: false,
    arrows: true,
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    asNavFor: '.flight-carousel',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  slideConfigBack = {
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 2,
    infinite: false,
    draggable: false,
    arrows: true,
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    asNavFor: '.backway-carousel',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  slickInit(event: any) {
    console.log('slick initialized', event);
  }

  breakpoint(event: any) {
    console.log('breakpoint', event);
  }

  afterChange(event: any) {
    console.log('afterChange', event);
  }

  beforeChange(event: any) {
    console.log('beforeChange', event);
  }

  ngOnInit() {
    if (this.response.backWay) {
      this.slideConfigBack.initialSlide = this.response.backWay.length - 3;
      this.flightCardConfigBack.initialSlide = this.response.backWay.length - 3;
    }
  }
}
