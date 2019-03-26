import { Component, OnInit } from '@angular/core';
import { SimulatorCalculatorService } from '../simulator-calculator.service';
import { SimulatorFields } from '../entity/simulator-fields';

@Component({
  selector: 'app-simulator-form',
  templateUrl: './simulator-form.component.html',
  styleUrls: ['./simulator-form.component.css']
})
export class SimulatorFormComponent implements OnInit {

  simulatorFields: SimulatorFields;

  calculateButtonBlocked: boolean;

  constructor(private simulatorCalculatorService: SimulatorCalculatorService) { 
    this.calculateButtonBlocked = false;
    this.simulatorFields = new SimulatorFields();
  }

  ngOnInit() {
    this.simulatorCalculatorService.init(this.simulatorFields);
  }

  generateTable() {
    this.simulatorCalculatorService.generateTable();
    this.calculateButtonBlocked = true;
    //TODO scrol to bottom
  }

  unlockCalculateButton() {
    this.calculateButtonBlocked = false;
  }

  isTableVoid(){
    return !this.simulatorCalculatorService.months || this.simulatorCalculatorService.months.length === 0;
  }

}
