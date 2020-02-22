import { Injectable, Type } from '@angular/core';
import { FormItemComponent, FormItemType } from './form-item';
import { TextFieldComponent } from 'src/app/form/text-field/text-field.component';
import { RadioButtonComponent } from 'src/app/form/radio-button/radio-button.component';
import { DatepickerComponent } from 'src/app/form/datepicker/datepicker.component';

function assertNever(_value: never, message?: string): never {
  throw new Error(message);
}

class FormItemComponentContainer {
  constructor(readonly component: Type<FormItemComponent>) {}
}

@Injectable({
  providedIn: 'root',
})
export class FormItemFactory {
  createComponentContainer(type: FormItemType): FormItemComponentContainer {
    switch (type) {
      case FormItemType.TextField:
        return new FormItemComponentContainer(TextFieldComponent);
      case FormItemType.RadioButton:
        return new FormItemComponentContainer(RadioButtonComponent);
      case FormItemType.Datepicker:
        return new FormItemComponentContainer(DatepickerComponent);
      default:
        assertNever(type, `Unexpected FormItemType: ${type}`);
    }
  }
}
