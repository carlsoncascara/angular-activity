import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Skill } from './skill/skill';
import { Skills } from './skill/skill-lists';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor() {}

  getSkills() : Skill[] {
    return Skills();
  }

  setSkill(skill : Skill){
    const skills = this.getSkills();
    skills.push(skill);
    window.localStorage.setItem("skill-list",JSON.stringify(skills));
  }
  
  getSkillName(id : number) : string {
    var name = "NONE";
    for(let skill of this.getSkills()){
      if(skill.id === id){
        name = skill.name;
        break;
      }
    }
    return name;
  }

  getSkill(skillID : number) : Observable<Skill>{
    const skill = Skills().find(sk => sk.id === skillID)!;
    return of(skill);
  }

  updateSkill(skill : Skill) : void {
    let skills = this.getSkills();
    const index = skills.findIndex( sk => sk.id === skill.id );
    if(index >= 0){
      skills[index].name = skill.name;
      window.localStorage.setItem("skill-list",JSON.stringify(skills));
    }
  }

  removeSkill(skillID : number) : void {
    let skills = Skills().filter( (skill) => skill.id !== skillID );
    window.localStorage.setItem("skill-list",JSON.stringify(skills));
  }

}
