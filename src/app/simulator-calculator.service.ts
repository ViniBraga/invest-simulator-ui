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

  generateTable(){
    this.months = [];
    let additionalInvestment = 0;
    for (let index = 0; index < this.simulatorFields.deadline; index++) {
      let previousTotalBalance = index === 0 ? this.simulatorFields.initialInvestment : this.months[index - 1].totalBalance;
      let month = this.generateMonth(previousTotalBalance, index + 1, additionalInvestment);
      this.months.push(month);
    }
    this.subject.next({ months: this.months });
  }

  generateMonth(previousTotalBalance, currentMonth, additionalInvestment): SimulatorRow {
    let profitabilityRate = this.simulatorFields.profitabilityRate ? this.simulatorFields.profitabilityRate : 0;
    let month = currentMonth ? currentMonth : 0;
    let openingBalance = roundValue(previousTotalBalance ? previousTotalBalance : 0, 2);
    let interest = roundValue(openingBalance * profitabilityRate / 100 , 2) ;
    let balancePlusInterest = roundValue(openingBalance + interest , 2);
    let monthInvestment = roundValue(this.simulatorFields.monthInvestment ? this.simulatorFields.monthInvestment : 0, 2);
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

  applyAdditionalInvestment(month) {
    this.updateMonth(month);
    this.recalculateMonthsFrom(month.month - 1)
    this.subject.next({ months: this.months });
  }

  updateMonth(month) {
    let balancePlusInterest = month.balancePlusInterest;
    let monthInvestment = month.monthInvestment;
    let additionalInvestment = month.additionalInvestment;
    month.totalBalance = roundValue(balancePlusInterest + monthInvestment + additionalInvestment, 2);
  }

  recalculateMonthsFrom(indexMonthUpdated) {
    let previousTotalBalance = this.months[indexMonthUpdated].totalBalance;
    if(this.months[indexMonthUpdated + 1]) {
      for (let index = indexMonthUpdated + 1; index < this.simulatorFields.deadline; index++) {
        this.months[index].openingBalance = roundValue(previousTotalBalance, 2) ;
        this.months[index].interest = roundValue(this.months[index].openingBalance * this.simulatorFields.profitabilityRate / 100 , 2)
        this.months[index].balancePlusInterest = roundValue(this.months[index].openingBalance + this.months[index].interest, 2)
        this.months[index].monthInvestment = roundValue(this.simulatorFields.monthInvestment, 2)
        this.months[index].totalBalance = roundValue(this.months[index].balancePlusInterest + this.months[index].monthInvestment + this.months[index].additionalInvestment, 2)
        previousTotalBalance = this.months[index].totalBalance;
      }
    }
  }

}
