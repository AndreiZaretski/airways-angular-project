import {
  Component, Input, OnInit, forwardRef,
} from '@angular/core';
import {
  AbstractControl, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators
} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { ILocation } from '../../model/search-form.model';

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
  @Input() items?: ILocation[];

  @Input() label?: string;

  @Input() placeholder = '';

  filteredItems?: Observable<ILocation[] | undefined>;

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
      return this.items?.find((x) => x.value === location)?.viewValue ?? '';
    }

    return location;
  }

  private filter(value: string): ILocation[] | undefined {
    const filterValue = value.toLowerCase();

    return this.items?.filter((option) => option.viewValue.toLowerCase().includes(filterValue));
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

  // validate(c: AbstractControl): ValidationErrors | null {
  validate(): ValidationErrors | null {
    // console.log('Location Input validation', c);
    return this.locationInput.valid ? null : { invalidForm: { valid: false, message: 'location input fields are invalid' } };
  }
}
