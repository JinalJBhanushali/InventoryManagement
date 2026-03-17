import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanInvoice } from './challan-invoice';

describe('ChallanInvoice', () => {
  let component: ChallanInvoice;
  let fixture: ComponentFixture<ChallanInvoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallanInvoice],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallanInvoice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
