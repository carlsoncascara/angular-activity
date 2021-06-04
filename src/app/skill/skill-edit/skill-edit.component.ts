import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

import { Skill } from '../skill';
import { SkillService } from '../../skill.service';
import { map } from 'jquery';

@Component({
  selector: 'app-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.css']
})
export class SkillEditComponent implements OnInit {

  skill : Skill | undefined;
  skillForm = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required]
  },{
    updateOn : 'blur'
  });

  constructor(
    private formBuilder : FormBuilder,
    private location : Location,
    private activatedRoute : ActivatedRoute,
    private skillService : SkillService
  ) { }

  ngOnInit(): void {
    this.getSkill();
  }

  getSkill(){
    const skillID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.skillService.getDBSkill(skillID)
      .subscribe(
        skill=>{
            console.log(skill[0]);
            
            this.skill = skill[0];
            this.skillForm.patchValue({
              id : this.skill?.id,
              name : this.skill?.name
            });          
          }
      );
  }

  updateChange() : void {
    let skill = this.skillForm.value;
    this.skillService.putDBSkill(skill).subscribe(
      (response)=>response,
      (err)=>console.log(err),
      ()=>console.log("Complete")
    );
    document.getElementById("modalCloseBtn")?.click();
    this.actionMessage = "Skill " + this.skillForm.get("name")?.value + " has been updated!";
    this.toShowToast();
  }

  goBackSkill(){
    this.location.back();
  }

  confirmation(e : any) {
    document.getElementById("confirmUpdateBtn")?.click();
    return false;
  }

  get name() {
    return this.skillForm.get("name");
  }

  showToast = false;
  actionMessage = "";

  toShowToast() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.goBackSkill();
    }, 4000);
  }

}
