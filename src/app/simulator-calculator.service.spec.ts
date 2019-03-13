import { TestBed } from '@angular/core/testing';

import { SimulatorCalculatorService } from './simulator-calculator.service';

describe('SimulatorCalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimulatorCalculatorService = TestBed.get(SimulatorCalculatorService);
    expect(service).toBeTruthy();
  });
});
