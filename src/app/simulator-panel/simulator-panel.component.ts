import { Component, OnInit } from '@angular/core';
import { SimulatorCalculatorService } from '../simulator-calculator.service';

@Component({
  selector: 'app-simulator-panel',
  templateUrl: './simulator-panel.component.html',
  styleUrls: ['./simulator-panel.component.css'],

})
export class SimulatorPanelComponent implements OnInit {

  constructor(private simulatorCalculatorService: SimulatorCalculatorService) {}

  ngOnInit() {
  }

}
