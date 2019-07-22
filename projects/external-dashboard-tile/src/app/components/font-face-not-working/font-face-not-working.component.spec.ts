import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontFaceNotWorkingComponent } from './font-face-not-working.component';

describe('FontFaceNotWorkingComponent', () => {
  let component: FontFaceNotWorkingComponent;
  let fixture: ComponentFixture<FontFaceNotWorkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontFaceNotWorkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontFaceNotWorkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
