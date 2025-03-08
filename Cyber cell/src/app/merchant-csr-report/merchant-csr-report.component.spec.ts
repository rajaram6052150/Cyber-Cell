import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantCsrReportComponent } from './merchant-csr-report.component';

describe('MerchantCsrReportComponent', () => {
  let component: MerchantCsrReportComponent;
  let fixture: ComponentFixture<MerchantCsrReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantCsrReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantCsrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
