import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B9eAgGridEncapsulatedComponent } from './b9e-ag-grid-encapsulated.component';

describe('B9eAgGridEncapsulatedComponent', () => {
  let component: B9eAgGridEncapsulatedComponent;
  let fixture: ComponentFixture<B9eAgGridEncapsulatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B9eAgGridEncapsulatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B9eAgGridEncapsulatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
