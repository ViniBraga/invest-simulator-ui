import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorInputComponent } from './simulator-input.component';

describe('SimulatorInputComponent', () => {
  let component: SimulatorInputComponent;
  let fixture: ComponentFixture<SimulatorInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
