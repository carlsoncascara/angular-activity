import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Skill } from './skill/skill';
import { Skills } from './skill/skill-lists';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  skillUrl = "http://localhost:3000/skill/";

  constructor(
    private http : HttpClient
  ) {}

  getDBSkill(id : number | undefined) {
    if(!id){
      return this.http.get<Skill[]>(this.skillUrl,{
        responseType: "json"
      });
    }else{
      return this.http.get<Skill>(this.skillUrl+"/"+id,{
        responseType: "json"
      });
    }
  }

  postDBSkill(skill : Skill) {
    const bodyRequest = {
      name: skill.name
    };
    return this.http.post<string>(this.skillUrl, bodyRequest);
  }

  putDBSkill(skill : Skill) {
    const bodyRequest = {
      name: skill.name
    };
    return this.http.put<string>(this.skillUrl+"/"+skill.id,bodyRequest);
  }

  deleteDBSkill(id : number) {
    return this.http.delete<string>(this.skillUrl+"/"+id);
  }


  /********************************************
  BELOW IS LINE WILL BE LOCAL STORAGE FUNCTIONS
  ********************************************/
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
