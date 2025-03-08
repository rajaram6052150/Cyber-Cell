import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCsrReportComponent } from './bank-csr-report.component';

describe('BankCsrReportComponent', () => {
  let component: BankCsrReportComponent;
  let fixture: ComponentFixture<BankCsrReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankCsrReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankCsrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
