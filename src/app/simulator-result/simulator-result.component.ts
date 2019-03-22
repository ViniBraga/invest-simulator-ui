import { Component, OnInit } from '@angular/core';
import { SimulatorCalculatorService } from '../simulator-calculator.service';

@Component({
  selector: 'app-simulator-result',
  templateUrl: './simulator-result.component.html',
  styleUrls: ['./simulator-result.component.css']
})
export class SimulatorResultComponent implements OnInit {

  months: any[];

  constructor(private simulatorCalculatorService: SimulatorCalculatorService) { 
  }
  
  ngOnInit() {
    this.simulatorCalculatorService.getMonths().subscribe((m) => this.months = m.months);
  }

}
