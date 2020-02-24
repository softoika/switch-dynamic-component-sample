import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormItemDirective } from '../form-item.directive';
import { FormItemComponent, FormItem } from '../form-item';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComponentTypeResolver } from 'src/app/form/component-type.resolver';

@Component({
  selector: 'app-form-item-host',
  templateUrl: './form-item-host.component.html',
  styleUrls: ['./form-item-host.component.css'],
})
export class FormItemHostComponent
  implements OnInit, OnDestroy, FormItemComponent {
  @Input() formItem: FormItem;
  @Output() valueChanges = new EventEmitter<any>();
  @ViewChild(FormItemDirective, { static: true }) directive: FormItemDirective;

  private onDestroy = new Subject<void>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private componentTypeResolver: ComponentTypeResolver,
  ) {}

  ngOnInit() {
    const componentType = this.componentTypeResolver.resolveComponentType(
      this.formItem.type,
    );
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      componentType,
    );
    const viewContainerRef = this.directive.viewContainerRef;
    const component = viewContainerRef.createComponent(componentFactory)
      .instance;
    // Input
    component.formItem = this.formItem;
    // Output
    component.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(value => this.valueChanges.emit(value));
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
