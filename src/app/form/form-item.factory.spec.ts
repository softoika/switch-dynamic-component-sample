import { TestBed } from '@angular/core/testing';

import { FormItemFactory } from './form-item.factory';

describe('FormItemFactory', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const factory: FormItemFactory = TestBed.get(FormItemFactory);
    expect(factory).toBeTruthy();
  });
});

