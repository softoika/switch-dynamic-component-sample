import { EventEmitter } from '@angular/core';

export enum FormItemType {
  RadioButton,
  TextField,
  Datepicker,
  // Checkbox,
}

export interface FormItem {
  type: FormItemType;
  id: string;
  title: string;
  required: boolean;
}

export interface RadioButton extends FormItem {
  type: FormItemType.RadioButton;
  options: { label: string; value: number }[];
}

export interface TextField extends FormItem {
  type: FormItemType.TextField;
  placeholder?: string;
}

export interface Datepicker extends FormItem {
  type: FormItemType.Datepicker;
  min?: Date;
  max?: Date;
}

type Input<T> = T;

export interface FormItemComponent {
  formItem: Input<FormItem>;
  valueChanges: EventEmitter<any>;
}
