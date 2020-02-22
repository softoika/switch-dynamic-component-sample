import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormItemDirective } from './form/form-item.directive';
import { FormItemHostComponent } from './form/form-item-host/form-item-host.component';
import { TextFieldComponent } from './form/text-field/text-field.component';
import { RadioButtonComponent } from './form/radio-button/radio-button.component';
import { DatepickerComponent } from './form/datepicker/datepicker.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FormItemDirective,
    FormItemHostComponent,
    TextFieldComponent,
    RadioButtonComponent,
    DatepickerComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'ja-JP' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
