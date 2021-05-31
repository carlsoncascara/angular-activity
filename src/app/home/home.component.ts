import { Component, OnInit } from '@angular/core';

import { Skill }  from '../skill/skill';
import { SkillService } from '../skill.service';
import { Employee } from '../employee/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  skills : Skill[] = [];
  employees : Employee[] = [];

  constructor(
    private skillService : SkillService,
    private employeeService : EmployeeService
  ) { }

  ngOnInit(): void {
    this.getSkills();
    this.getEmployees();
  }

  getSkills() : void {
    this.skills = this.skillService.getSkills();
  }

  getEmployees() : void {
    this.employees = this.employeeService.getEmployees();
  }

  getSkillName(id : number) : string {
    return this.skillService.getSkillName(id);
  }

  getAge(date:any){
    return this.employeeService.getEmployeeAge(date);
  }

}
