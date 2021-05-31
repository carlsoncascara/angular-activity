import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  { path: "employee", component: EmployeesComponent },
  { path: "employee-detail/:id", component: EmployeeEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
