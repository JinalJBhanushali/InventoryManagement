import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingInfo } from './shipping-info';

describe('ShippingInfo', () => {
  let component: ShippingInfo;
  let fixture: ComponentFixture<ShippingInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
