import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { getDateYMDFormat } from './helper/dateparser';

import { Employee } from './employee/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeUrl = "http://localhost:3000/employee/";

  constructor(
    private http : HttpClient
  ) { }

  nextID(){
    return this.http.get<number>(this.employeeUrl+"next_id",{responseType: 'json'});
  }

  getDBEmployees() {
    return this.http.get<Employee[]>(this.employeeUrl,{responseType: 'json'});
  }

  getDBEmployee(id : number){
      return this.http.get<Employee>(this.employeeUrl+id,{responseType: 'json'});
  }

  postDBEmployee(employee : Employee) {
    const bodyRequest = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      birthdate: employee.birthdate,
      skills: employee.skills.length>0?employee.skills.join(","):null
    };
    return this.http.post<string>(this.employeeUrl, bodyRequest,{responseType:'json'});
  }

  putDBEmployee(employee : Employee) {
    const bodyRequest = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      birthdate: employee.birthdate,
      skills: employee.skills.length>0?employee.skills.join(","):null
    };
    return this.http.put<string>(this.employeeUrl+employee.employeeID, bodyRequest,{responseType:"json"});
  }

  deleteDBEmployee(id : number) {
    return this.http.delete<string>(this.employeeUrl+id,{responseType:"json"});
  }

  getEmployeeAge(date:any) : number { 
    let dateNow = new Date();
    let dateGet = new Date(date);
    var dateRes = Math.abs(
      new Date(dateNow.getTime() - dateGet.getTime())
        .getUTCFullYear() - 1970
    );
    return dateRes;
  }

  // getEmployees() : Employee[] { 
  //   return Employees();
  // }
  
  // setEmployee(employee : Employee) : void {
  //   let employees = this.getEmployees();
  //   employees.push(employee);
  //   window.localStorage.setItem("employee-list",JSON.stringify(employees));
  // }
  
  // updateEmployee(employee : Employee) : void {
  //   let employees = this.getEmployees();
  //   const index = employees.findIndex( emp => emp.employeeID === employee.employeeID );
  //   if(index >= 0){
  //     employees[index].firstName = employee.firstName;
  //     employees[index].lastName = employee.lastName;
  //     employees[index].birthdate = employee.birthdate;
  //     employees[index].skills = employee.skills;
  //     window.localStorage.setItem("employee-list",JSON.stringify(employees));
  //   }
  // }  
  
  // removeEmployee(employeeID : number) : void{
  //   let employees = Employees().filter( (emp) => emp.employeeID !== employeeID );
  //   window.localStorage.setItem("employee-list",JSON.stringify(employees));    
  // }
  
  
  // getEmployee(id : number) : Observable<Employee> {
  //   const employee = Employees().find(emp => emp.employeeID === id)!;
  //   return of(employee);
  // }
  

}
