import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { ILocation } from '../../model/search-form.model';

@Component({
  selector: 'app-autocomplete-dropdown',
  templateUrl: './autocomplete-dropdown.component.html',
  styleUrls: ['./autocomplete-dropdown.component.scss'],
})
export class AutocompleteDropdownComponent implements OnInit {
  @Input() items?: ILocation[];

  @Input() label?: string;

  @Input() placeholder = '';

  filteredItems?: Observable<ILocation[] | undefined>;

  locationInput = new FormControl();

  ngOnInit(): void {
    this.filteredItems = this.locationInput.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value || '')),
    );
  }

  displayFn(location: string): string {
    if (location) {
      return this.items?.find((x) => x.value === location)?.viewValue ?? '';
    }

    return location;
  }

  private filter(value: string): ILocation[] | undefined {
    const filterValue = value.toLowerCase();

    return this.items?.filter((option) => option.viewValue.toLowerCase().includes(filterValue));
  }
}
