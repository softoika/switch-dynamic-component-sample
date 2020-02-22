import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormItemComponent, RadioButton } from '../form-item';
import { FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css'],
})
export class RadioButtonComponent implements OnInit, FormItemComponent {
  @Input() formItem: RadioButton;
  @Output() valueChanges = new EventEmitter<any>();

  selectedValue = new FormControl();

  private onDestroy = new Subject<void>();

  ngOnInit(): void {
    if (this.formItem.required) {
      this.selectedValue.setValidators([Validators.required]);
    }

    this.selectedValue.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(value => this.valueChanges.emit(value));
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
