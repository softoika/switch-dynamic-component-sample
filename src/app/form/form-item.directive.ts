import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFormItem]',
})
export class FormItemDirective {
  constructor(readonly viewContainerRef: ViewContainerRef) {}
}
