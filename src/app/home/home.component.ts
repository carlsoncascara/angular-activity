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
  showEmployees = false;

  constructor(
    private skillService : SkillService,
    private employeeService : EmployeeService
  ) { }

  ngOnInit(): void {
    this.getSkills();
  }

  getSkills() : void {
    this.skillService.getDBSkills().subscribe(
      skills=>this.skills=skills,
      err=>console.error(err),
      ()=>this.getEmployees()
    );
  }

  getEmployees() : void {
    this.employeeService.getDBEmployees().subscribe(
      employees=>this.employees=employees,
      err=>console.error(err),
      ()=>this.showEmployees=true
    );  
  }

  getSkillName(id : number) : string | undefined {
    const skill = this.skills.find(skill=>skill.id==id);
    return skill?.name;
  }

  getAge(date:any){
    return this.employeeService.getEmployeeAge(date);
  }

}
