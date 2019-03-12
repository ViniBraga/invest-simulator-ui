import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

const roundValue = ((num, n) => {
  const m = Math.pow(10, n);
  return (Math.round(num * m ) / m);
});

@Component({
  selector: 'app-simulator-panel',
  templateUrl: './simulator-panel.component.html',
  styleUrls: ['./simulator-panel.component.css']
})
export class SimulatorPanelComponent implements OnInit {

  initialInvestment = 5000;
  monthInvestment = 200;
  deadline = 12;
  profitabilityRate = 2.95;

  months = [];

  constructor() { 
    let initialMonth = 1;
    let additionalInvestment = 0;
    this.updateMonthsFrom(initialMonth, additionalInvestment);
  }

  updateMonthsFrom(month, additionalInvestment) {
    for (let index = month - 1; index < this.deadline; index++) {
      let previousTotalBalance = index === 0 ? this.initialInvestment : this.months[index - 1].totalBalance;
      let month = this.generateMonth(previousTotalBalance, index + 1, additionalInvestment);
      if(this.months[index]) {
        this.months[index] = month
      } else {
        this.months.push(month);
      }
    }
  }

  generateMonth(previousTotalBalance, currentMonth, additionalInvestment) {
    let month = currentMonth;
    let openingBalance = roundValue(previousTotalBalance, 2);
    let interest = roundValue(openingBalance * this.profitabilityRate / 100 , 2) ;
    let balancePlusInterest = roundValue(openingBalance + interest , 2);
    let monthInvestment = roundValue(this.monthInvestment, 2);
    let totalBalance = balancePlusInterest + monthInvestment + additionalInvestment;
    return {      
      month: month, 
      openingBalance: openingBalance,
      interest: interest,
      balancePlusInterest : balancePlusInterest,
      monthInvestment: monthInvestment,
      additionalInvestment: additionalInvestment,
      totalBalance: totalBalance}
  }


  ngOnInit() {
  }

}
