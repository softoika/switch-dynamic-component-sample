import { Injectable, Type } from '@angular/core';
import { FormItemType, FormItemComponent } from 'src/app/form/form-item';
import { TextFieldComponent } from 'src/app/form/text-field/text-field.component';
import { RadioButtonComponent } from 'src/app/form/radio-button/radio-button.component';
import { DatepickerComponent } from 'src/app/form/datepicker/datepicker.component';

function assertNever(_value: never, message?: string): never {
  throw new Error(message);
}

@Injectable({
  providedIn: 'root',
})
export class ComponentTypeResolver {
  resolveComponentType(type: FormItemType): Type<FormItemComponent> {
    switch (type) {
      case FormItemType.TextField:
        return TextFieldComponent;
      case FormItemType.RadioButton:
        return RadioButtonComponent;
      case FormItemType.Datepicker:
        return DatepickerComponent;
      default:
        assertNever(type, `Unexpected FormItemType: ${type}`);
    }
  }
}
