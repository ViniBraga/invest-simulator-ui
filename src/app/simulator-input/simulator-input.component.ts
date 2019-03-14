import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-simulator-input',
  templateUrl: './simulator-input.component.html',
  styleUrls: ['./simulator-input.component.css']
})
export class SimulatorInputComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  type: string;

  constructor() { }

  ngOnInit() {
  }

}
