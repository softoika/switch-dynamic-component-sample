import { TestBed } from '@angular/core/testing';

import { ComponentTypeResolver } from './component-type.resolver';

describe('ComponentTypeResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const resolver: ComponentTypeResolver = TestBed.get(ComponentTypeResolver);
    expect(resolver).toBeTruthy();
  });
});

