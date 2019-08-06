import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostmarksComponent } from './postmarks.component';

describe('PostmarksComponent', () => {
  let component: PostmarksComponent;
  let fixture: ComponentFixture<PostmarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostmarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
