import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialCsrReportComponent } from './social-csr-report.component';

describe('SocialCsrReportComponent', () => {
  let component: SocialCsrReportComponent;
  let fixture: ComponentFixture<SocialCsrReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialCsrReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialCsrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
