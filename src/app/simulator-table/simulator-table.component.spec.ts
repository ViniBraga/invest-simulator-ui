import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorTableComponent } from './simulator-table.component';

describe('SimulatorTableComponent', () => {
  let component: SimulatorTableComponent;
  let fixture: ComponentFixture<SimulatorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
