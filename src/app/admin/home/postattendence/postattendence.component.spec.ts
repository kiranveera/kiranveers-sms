import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostattendenceComponent } from './postattendence.component';

describe('PostattendenceComponent', () => {
  let component: PostattendenceComponent;
  let fixture: ComponentFixture<PostattendenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostattendenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostattendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
