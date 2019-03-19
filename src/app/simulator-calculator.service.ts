import { Injectable } from '@angular/core';
import { SimulatorFields } from './entity/simulator-fields';
import { SimulatorRow } from './entity/simulator-row';
import { Subject, Observable } from 'rxjs';

const roundValue = ((num, n) => {
  const m = Math.pow(10, n);
  return (Math.round(num * m ) / m);
});

@Injectable({
  providedIn: 'root'
})
export class SimulatorCalculatorService {

  private simulatorFields: SimulatorFields;
  private subject = new Subject<any>();

  months: any[];
  
  init(simulatorFields: SimulatorFields) { 
    this.months = [];
    this.simulatorFields = simulatorFields;
  }

  initializeMonths(){
    this.months = [];
    let initialMonth = 1;
    let additionalInvestment = 0;
    this.updateMonthsFrom(initialMonth, additionalInvestment);
  }

  



  updateMonthsFrom(month, additionalInvestment) {
    for (let index = month - 1; index < this.simulatorFields.deadline; index++) {
      let previousTotalBalance = index === 0 ? this.simulatorFields.initialInvestment : this.months[index - 1].totalBalance;
      let month = this.generateMonth(previousTotalBalance, index + 1, additionalInvestment);
      if(this.months[index]) {
        this.months[index] = month;
      } else {
        this.months.push(month);
      }
    }
    this.subject.next({ months: this.months });
  }

  generateMonth(previousTotalBalance, currentMonth, additionalInvestment): SimulatorRow {
    let month = currentMonth;
    let openingBalance = roundValue(previousTotalBalance, 2);
    let interest = roundValue(openingBalance * this.simulatorFields.profitabilityRate / 100 , 2) ;
    let balancePlusInterest = roundValue(openingBalance + interest , 2);
    let monthInvestment = roundValue(this.simulatorFields.monthInvestment, 2);
    let totalBalance = roundValue(balancePlusInterest + monthInvestment + additionalInvestment, 2);

    return {
      month,
      openingBalance,
      interest,
      balancePlusInterest,
      monthInvestment,
      additionalInvestment,
      totalBalance
    }
  }

  getMonths(): Observable<any> {
    return this.subject.asObservable();
  }

}
