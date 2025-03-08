import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedBankReportsComponent } from './combined-bank-reports.component';

describe('CombinedBankReportsComponent', () => {
  let component: CombinedBankReportsComponent;
  let fixture: ComponentFixture<CombinedBankReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombinedBankReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinedBankReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
