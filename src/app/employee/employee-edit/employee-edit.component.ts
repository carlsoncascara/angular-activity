import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormArray, Validators } from '@angular/forms';

import { Employee } from '../employee';
import { EmployeeService } from '../../employee.service';
import { validateBirthdate } from '../employee.validator';
import { Skill } from '../../skill/skill';
import { SkillService } from '../../skill.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employee : Employee | undefined;
  employeeForm = this.formBuilder.group({
    employeeID : ['', Validators.required],
    firstName : ['', Validators.required],
    lastName : ['', Validators.required],
    birthdate : ['0000-00-00', [
        Validators.required,
        validateBirthdate(this.employeeService)
      ]
    ],
    skills : this.formBuilder.array([])
  },
  {
    updateOn: 'blur'
  });
  skillGroup : Skill[] = [];
  
  constructor(
    private formBuilder : FormBuilder,
    private location : Location,
    private activatedRoute : ActivatedRoute,
    private employeeService : EmployeeService,
    private skillService : SkillService
  ) { }

  ngOnInit(): void {
    this.getSkills();
    this.getEmployee();
  }
  
  getEmployee() : void {
    const employeeID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.employeeService.getEmployee(employeeID)
    .subscribe(employee => {
      this.employee = employee;
      this.employeeForm.patchValue({
        employeeID : this.employee.employeeID,
        firstName : this.employee.firstName,
        lastName : this.employee.lastName,
        birthdate : this.employee.birthdate
      });    
      this.skillGroup.forEach((skill)=>{
        if(employee.skills.findIndex(sk=>skill.id===sk) >= 0){
          this.skills.push(this.formBuilder.control(true));
        }else{
          this.skills.push(this.formBuilder.control(false));
        }
      });
    });
  }

  getSkills() : void {
    this.skillGroup = this.skillService.getSkills()
  }

  get fname() {
    return this.employeeForm.get("firstName");
  }

  get lname() {
    return this.employeeForm.get("lastName");
  }

  get bdate() {
    return this.employeeForm.get("birthdate");
  }

  get skills() {
    return this.employeeForm.get("skills") as FormArray;
  }

  initSelectedSkill() : void {
    this.skillGroup.forEach((skill)=>{
      this.skills.push(this.formBuilder.control(false));
    });
  }

  updateChange() : void {
    let employee = this.employeeForm.value;
    let data : Employee = {
      employeeID: employee.employeeID,
      firstName: employee.firstName,
      lastName: employee.lastName,
      birthdate: employee.birthdate,
      skills: this.getSkillID(employee.skills)
    }
    this.employeeService.updateEmployee(data);
    document.getElementById("modalCloseBtn")?.click();
    this.actionMessage = "Employee " + data.firstName + " has been updated!";
    this.toShowToast();
  }

  getSkillID(selectedSkill : boolean[]){
    var ids : number[] = [];
    this.skillGroup.forEach((value, index)=>{
      if(selectedSkill[index]){
        ids.push(value.id);
      }
    });
    return ids;
  }

  goBackEmployee() : void{
    this.location.back();
  }

  confirmation(e : any) {
    document.getElementById("updateConfirmationBtn")?.click();
    return false;
  }

  showToast = false;
  actionMessage = "";

  toShowToast() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.goBackEmployee();
    }, 4000);
  }

}
