import { Component, OnInit, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import { SimulatorCalculatorService } from '../simulator-calculator.service';

@Component({
  selector: 'app-simulator-result',
  templateUrl: './simulator-result.component.html',
  styleUrls: ['./simulator-result.component.css']
})
export class SimulatorResultComponent implements OnInit {

  finalTotalInvested: number;

  finalTotalEarned: number;

  finalTotalBalance: number;

  constructor(private simulatorCalculatorService: SimulatorCalculatorService) { 
  }
  
  ngOnInit() {
    this.simulatorCalculatorService.getMonths().subscribe((m) => { 
      this.finalTotalBalance = m.finalTotalBalance;
      this.finalTotalEarned = m.finalTotalEarned;
      this.finalTotalInvested = m.finalTotalInvested;
    });
    this.simulatorCalculatorService.generateTable();
  }

}
