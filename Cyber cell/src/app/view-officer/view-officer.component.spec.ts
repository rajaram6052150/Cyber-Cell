import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOfficerComponent } from './view-officer.component';

describe('ViewOfficerComponent', () => {
  let component: ViewOfficerComponent;
  let fixture: ComponentFixture<ViewOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOfficerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
