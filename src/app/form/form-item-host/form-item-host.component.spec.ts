import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemHostComponent } from './form-item-host.component';

describe('FormItemHostComponent', () => {
  let component: FormItemHostComponent;
  let fixture: ComponentFixture<FormItemHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormItemHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
