import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnDestroy,
} from '@angular/core';
import { FormItemComponent, TextField } from '../form-item';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css'],
})
export class TextFieldComponent
  implements OnInit, OnDestroy, FormItemComponent {
  @Input() formItem: TextField;
  @Output() valueChanges = new EventEmitter<any>();

  text = new FormControl();

  private onDestroy = new Subject<void>();

  ngOnInit(): void {
    if (this.formItem.required) {
      this.text.setValidators([Validators.required]);
    }

    this.text.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(value => this.valueChanges.emit(value));
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
