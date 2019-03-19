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

  constructor(private simulatorCalculatorService: SimulatorCalculatorService) { 
    this.simulatorFields = new SimulatorFields();
  }

  ngOnInit() {
    this.simulatorCalculatorService.init(this.simulatorFields);
    this.simulatorCalculatorService.initializeMonths();
  }

  initializeTable(){
    this.simulatorCalculatorService.initializeMonths();
  }

  updateTable() {
    this.initializeTable();
  }

}
