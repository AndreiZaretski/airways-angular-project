import { Component, Input } from '@angular/core';
import { IAirResponse } from 'src/app/shared/models/interfaces';

@Component({
  selector: 'app-flights-selection-item',
  templateUrl: './flights-selection-item.component.html',
  styleUrls: ['./flights-selection-item.component.scss'],
})
export class FlightsSelectionItemComponent {
  @Input() index: number;

  @Input() response: IAirResponse;

  @Input() source: string;
}
