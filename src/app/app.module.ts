import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { SimulatorFormComponent } from './simulator-form/simulator-form.component';
import { SimulatorTableComponent } from './simulator-table/simulator-table.component';
import { SimulatorInputComponent } from './simulator-input/simulator-input.component';
import { SimulatorPanelComponent } from './simulator-panel/simulator-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    SimulatorPanelComponent,
    SimulatorFormComponent,
    SimulatorTableComponent,
    SimulatorInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
