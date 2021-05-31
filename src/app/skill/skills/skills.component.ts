import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Skill } from '../skill';
import { SkillService } from '../../skill.service';
import { Employee } from '../../employee/employee';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skillID : number = 1;
  employees : Employee[] = [];
  skills : Skill[] = [];
  skillForm = this.initializeBuilder();

  toDelete : number = -1;

  actionMessage = "";
  showToast = false;

  constructor(
    private formBuilder : FormBuilder,
    private skillService : SkillService,
    private employeeService : EmployeeService
  ) { }

  ngOnInit(): void {
    this.getSkills();
    this.getEmployees();
    this.skillForm = this.initializeBuilder();
  }

  initializeBuilder() {
    this.skillID = 1;
    for(; this.skills.findIndex( skill=>skill.id === this.skillID ) > -1; this.skillID++);

    return this.formBuilder.group({
      id : [ this.skillID ],
      name : ['', Validators.required ]
    },{
      updateOn: 'blur'
    });
  }

  getSkills() : void {
    this.skills = this.skillService.getSkills();
  }

  getEmployees() : void {
    this.employees = this.employeeService.getEmployees();
  }

  get id(){
    return this.skillForm.get("id");
  }

  get name(){
    return this.skillForm.get("name");
  }

  addSkill() : void {
    let skill : Skill = this.skillForm.value;
    this.skillService.setSkill(skill);
    this.skillForm.patchValue({
      id: "",
      name: ""
    });
    this.getSkills();
    this.skillForm = this.initializeBuilder();
    this.actionMessage = "New Skill Added!";
    this.toShowToast();
    document.getElementById("newSkillID")?.focus();
  }

  toRemove(skillID : number) : void {
    this.toDelete = skillID;
  }

  isSkillUsed(){
    let found = false;
    if(this.toDelete >= 0 ){
      for(let cnt = 0; cnt < this.employees.length && !found; cnt++){
        if(this.employees[cnt].skills.find(skill => skill===this.toDelete)){
          found = true;
        }
      }
    }
    return found;
  }

  deleteSkill(skillID : number) : void{ 
    const skillname = this.skills.find(skill=>skill.id==skillID)?.name;
    this.skillService.removeSkill(skillID);
    document.getElementById("modalCloseBtn")?.click();
    this.getSkills();
    this.skillForm = this.initializeBuilder();
    this.actionMessage = "Skill " + skillname + " has been removed!";
    this.toShowToast();
  }

  toShowToast() {
    this.showToast = true;
    setTimeout(() => this.showToast = false, 4000);
  }

}
