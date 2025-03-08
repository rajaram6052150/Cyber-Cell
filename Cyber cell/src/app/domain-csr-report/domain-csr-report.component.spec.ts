import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainCsrReportComponent } from './domain-csr-report.component';

describe('DomainCsrReportComponent', () => {
  let component: DomainCsrReportComponent;
  let fixture: ComponentFixture<DomainCsrReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainCsrReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomainCsrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
