import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Employee } from './employee/employee';
import { Employees } from './employee/employee-lists';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  getEmployees() : Employee[] { 
    return Employees();
  }

  
  setEmployee(employee : Employee) : void {
    let employees = this.getEmployees();
    employees.push(employee);
    window.localStorage.setItem("employee-list",JSON.stringify(employees));
  }
  
  updateEmployee(employee : Employee) : void {
    let employees = this.getEmployees();
    const index = employees.findIndex( emp => emp.employeeID === employee.employeeID );
    if(index >= 0){
      employees[index].firstName = employee.firstName;
      employees[index].lastName = employee.lastName;
      employees[index].birthdate = employee.birthdate;
      employees[index].skills = employee.skills;
      window.localStorage.setItem("employee-list",JSON.stringify(employees));
    }
  }  
  
  removeEmployee(employeeID : number) : void{
    let employees = Employees().filter( (emp) => emp.employeeID !== employeeID );
    window.localStorage.setItem("employee-list",JSON.stringify(employees));    
  }
  
  getEmployeeAge(date:any) : number { 
    let dateNow = new Date();
    let dateGet = new Date(date);
    var dateRes = Math.abs(new Date(dateNow.getTime() - dateGet.getTime()).getUTCFullYear() - 1970);
    return dateRes;
  }
  
  getEmployee(id : number) : Observable<Employee> {
    const employee = Employees().find(emp => emp.employeeID === id)!;
    return of(employee);
  }
}
