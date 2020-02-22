import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormItemComponent, Datepicker } from '../form-item';
import {
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import * as dayjs from 'dayjs';
import { takeUntil } from 'rxjs/operators';

function minDateValidator(minDate: Date): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const date = dayjs(control.value);
    const invalid = date.isBefore(minDate);
    console.log(control.value, minDate);
    return invalid ? { minDate: { value: control.value } } : null;
  };
}

function maxDateValidator(maxDate: Date): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const date = dayjs(control.value);
    const invalid = date.isAfter(maxDate);
    return invalid ? { maxDate: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
})
export class DatepickerComponent
  implements OnInit, OnDestroy, FormItemComponent {
  @Input() formItem: Datepicker;
  @Output() valueChanges = new EventEmitter<any>();

  date = new FormControl();

  private onDestroy = new Subject<void>();

  ngOnInit(): void {
    const validators = [];
    if (this.formItem.required) {
      validators.push(Validators.required);
    }
    if (this.formItem.min) {
      validators.push(minDateValidator(this.formItem.min));
    }
    if (this.formItem.max) {
      validators.push(maxDateValidator(this.formItem.max));
    }
    this.date.setValidators(validators);

    this.date.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(value => this.valueChanges.emit(value));
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
