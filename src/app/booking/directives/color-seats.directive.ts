import {
  Directive, ElementRef, Input, OnChanges, Renderer2,
} from '@angular/core';

enum Colors {
  MoreThanHalfAvailable = '#7f8906',
  LessThanHalfAvailable = '#f1c933',
  FewSeatsAvailable = '#b3261e',

}

@Directive({
  selector: '[appColorSeats]',
})
export class ColorSeatsDirective implements OnChanges {
  @Input() seatsCount?: number;

  private color = Colors.MoreThanHalfAvailable;

  private totalSeats = 200;

  private minSeats = 10;

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnChanges(): void {
    this.setColor();

    if (this.elementRef.nativeElement.classList.contains('slide')) {
      this.renderer2.setStyle(
        this.elementRef.nativeElement,
        'border-bottom',
        `4px solid ${this.color}`,
      );
    } else {
      this.renderer2.setStyle(
        this.elementRef.nativeElement,
        'background-color',
        `${this.color}4d`,
      );
    }
  }

  private setColor(): void {
    if (this.seatsCount) {
      if (this.seatsCount > this.totalSeats / 2) {
        this.color = Colors.MoreThanHalfAvailable;
      } else if (this.seatsCount < this.minSeats) {
        this.color = Colors.FewSeatsAvailable;
      } else {
        this.color = Colors.LessThanHalfAvailable;
      }
    }
  }
}
