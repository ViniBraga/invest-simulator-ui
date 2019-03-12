import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorPanelComponent } from './simulator-panel.component';

describe('SimulatorPanelComponent', () => {
  let component: SimulatorPanelComponent;
  let fixture: ComponentFixture<SimulatorPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulatorPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulatorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
