# Dynamic Componentで安全にswitch caseする
never型による網羅性チェックとDynamic Componentを使って安全にswitch caseするAngularのサンプルプロジェクト

こんな感じでFactoryを定義して
```form-item.factory.ts
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
```
Dynamic Componentを定義すれば

```form-item-host.ts
@Component({
  selector: 'app-form-item-host',
  template: '<ng-template appFormItem></ng-template>',
})
export class FormItemHostComponent implements OnInit, FormItemComponent {
  @Input() formItem: FormItem;
  @Output() valueChanges = new EventEmitter<any>();
  @ViewChild(FormItemDirective, { static: true }) directive: FormItemDirective;

  constructor(
    private resolver: ComponentFactoryResolver,
    private formItemFactory: FormItemFactory,
  ) {}

  ngOnInit() {
    const container = this.formItemFactory.createComponentContainer(
      this.formItem.type,
    );
    const componentFactory = this.resolver.resolveComponentFactory(
      container.component,
    );
    const viewContainerRef = this.directive.viewContainerRef;
    viewContainerRef.clear();
    const component = viewContainerRef.createComponent(componentFactory)
      .instance;
    // Input
    component.formItem = this.formItem;
    // Output
    component.valueChanges.subscribe(value => this.valueChanges.emit(value));
  }
}
```

こんな感じにngIf/ngSwitchを使わずに(比較的)安全に書ける
```ts
<app-form-item-host
  *ngFor="let formItem of formItems"
  [formItem]="formItem"
  (valueChanges)="consoleLog($event)"
></app-form-item-host>
```

---
Factoryではnever型を使った網羅性チェックをしているのでswitchするケースが漏れているとビルド時にコンパイラが怒ってくれる
```ts
function assertNever(_value: never, message?: string): never {
  throw new Error(message);
}
```
