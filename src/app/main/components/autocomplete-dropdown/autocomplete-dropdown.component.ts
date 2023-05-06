import {
  Component, Input, OnInit, forwardRef,
} from '@angular/core';
import {
  FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators,
} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { IAirport } from 'src/app/shared/models/interface-airport-locations';

@Component({
  selector: 'app-autocomplete-dropdown',
  templateUrl: './autocomplete-dropdown.component.html',
  styleUrls: ['./autocomplete-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteDropdownComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AutocompleteDropdownComponent),
      multi: true,
    },
  ],
})
export class AutocompleteDropdownComponent implements OnInit {
  @Input() items?: IAirport[];

  @Input() label?: string;

  @Input() placeholder = '';

  filteredItems?: Observable<IAirport[] | undefined>;

  locationInput = new FormControl('', [Validators.required]);

  onTouched: () => void = () => {};

  ngOnInit(): void {
    this.filteredItems = this.locationInput.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value || '')),
    );
  }

  displayFn(location: string): string {
    if (location) {
      const selectedLocation = this.items?.find((x) => x.iataCode === location);
      return selectedLocation ? `${selectedLocation?.city} (${selectedLocation?.iataCode})` : '';
    }

    return location;
  }

  private filter(value: string): IAirport[] | undefined {
    const filterValue = value.toLowerCase();

    return this.items?.filter(
      (option) => option.city.toLowerCase().includes(filterValue)
      || option.iataCode.toLowerCase().includes(filterValue)
      || option.name.toLowerCase().includes(filterValue)
      || option.country.toLowerCase().includes(filterValue),
    );
  }

  writeValue(val: any): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    val && this.locationInput.setValue(val, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.locationInput.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(): ValidationErrors | null {
    return this.locationInput.valid ? null : { invalidForm: { valid: false, message: 'location input fields are invalid' } };
  }
}
