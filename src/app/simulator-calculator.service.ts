import { Injectable } from '@angular/core';
import { SimulatorFields } from './entity/simulator-fields';
import { SimulatorRow } from './entity/simulator-row';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimulatorCalculatorService {

  private simulatorFields: SimulatorFields;
  private simulatorFieldsProcess: SimulatorFields;
  private subject = new Subject<any>();

  months: any[];
  
  init(simulatorFields: SimulatorFields) { 
    this.months = [];
    this.simulatorFields = simulatorFields;
  }

  generateTable() {
    this.simulatorFieldsProcess = {
      deadline: Number(this.simulatorFields.deadline),
      initialInvestment: Number(this.simulatorFields.initialInvestment),
      monthInvestment: Number(this.simulatorFields.monthInvestment),
      profitabilityRate: Number(this.simulatorFields.profitabilityRate)
    }
    this.months = [];
    for (let index = 0; index < this.simulatorFields.deadline; index++) {
      let previousTotalBalance = index === 0 ? this.simulatorFields.initialInvestment : this.months[index - 1].totalBalance;
      let month = this.generateMonth(parseFloat(previousTotalBalance), index + 1);
      this.months.push(month);
    }
    this.subject.next({ months: this.months });
  }

  generateMonth(previousTotalBalance, currentMonth): SimulatorRow {
    
    let profitabilityRate = (this.simulatorFieldsProcess.profitabilityRate ? this.simulatorFieldsProcess.profitabilityRate : 0 ) / 100;    
    let month = currentMonth ? currentMonth : 0;
    let openingBalance = previousTotalBalance ? previousTotalBalance : 0;
    let interest = openingBalance * profitabilityRate;
    
    let balancePlusInterest = openingBalance + interest;

    let monthInvestment: number = this.simulatorFieldsProcess.monthInvestment ? this.simulatorFieldsProcess.monthInvestment : 0;
    
    

    let additionalInvestment = 0;
    let totalBalance =  balancePlusInterest + monthInvestment;

    
    const s = {
      month,
      openingBalance,
      interest,
      balancePlusInterest,
      monthInvestment,
      additionalInvestment,
      totalBalance
    }
    
    console.log(JSON.stringify(s));
    return s;
  }

  getMonths(): Observable<any> {
    return this.subject.asObservable();
  }

  applyAdditionalInvestment(month: SimulatorRow) {
    month.additionalInvestment = Number(month.additionalInvestment);
    this.updateMonth(month);
    this.recalculateMonthsFrom(month.month - 1)
    this.subject.next({ months: this.months });
  }

  updateMonth(month: SimulatorRow) {
    let balancePlusInterest = month.balancePlusInterest;
    let monthInvestment = month.monthInvestment;
    let additionalInvestment = month.additionalInvestment;
    month.totalBalance = balancePlusInterest + monthInvestment + additionalInvestment;
  }

  recalculateMonthsFrom(indexMonthUpdated) {
    let previousTotalBalance = this.months[indexMonthUpdated].totalBalance;
    if(this.months[indexMonthUpdated + 1]) {
      for (let index = indexMonthUpdated + 1; index < this.simulatorFieldsProcess.deadline; index++) {
        this.months[index].openingBalance = previousTotalBalance;
        this.months[index].interest = this.months[index].openingBalance * this.simulatorFields.profitabilityRate / 100;
        this.months[index].balancePlusInterest = this.months[index].openingBalance + this.months[index].interest;
        this.months[index].monthInvestment = this.simulatorFieldsProcess.monthInvestment;
        this.months[index].totalBalance = this.months[index].balancePlusInterest + this.months[index].monthInvestment + this.months[index].additionalInvestment;
        previousTotalBalance = this.months[index].totalBalance;
      }
    }
  }

}
