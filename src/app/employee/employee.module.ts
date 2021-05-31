import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
