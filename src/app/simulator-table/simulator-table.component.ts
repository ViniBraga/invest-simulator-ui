import { Component, OnInit } from '@angular/core';
import { SimulatorCalculatorService } from '../simulator-calculator.service';

@Component({
  selector: 'app-simulator-table',
  templateUrl: './simulator-table.component.html',
  styleUrls: ['./simulator-table.component.css']
})
export class SimulatorTableComponent implements OnInit {

  months: any[];

  constructor(private simulatorCalculatorService: SimulatorCalculatorService) { 
  }

  ngOnInit() {
    this.simulatorCalculatorService.getMonths().subscribe((m) => this.months = m.months);

    let initialMonth = 1;
    let additionalInvestment = 0;
    this.simulatorCalculatorService.updateMonthsFrom(initialMonth, additionalInvestment);
  }

}
