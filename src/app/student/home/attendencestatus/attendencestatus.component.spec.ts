import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendencestatusComponent } from './attendencestatus.component';

describe('AttendencestatusComponent', () => {
  let component: AttendencestatusComponent;
  let fixture: ComponentFixture<AttendencestatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendencestatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendencestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
