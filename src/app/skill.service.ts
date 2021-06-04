import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Skill } from './skill/skill';


@Injectable({
  providedIn: 'root'
})

export class SkillService {

  skillUrl = 'http://localhost:3000/skill/';

  constructor(
    private http : HttpClient
  ) {}

  nextID() {
    return this.http.get<number>(this.skillUrl+'next_id',{responseType:'json'});
  }

  getDBSkills() {
      return this.http.get<Skill[]>(this.skillUrl,{responseType: 'json'});
  }
  
  getDBSkill(id : number) {
      return this.http.get<Skill[]>(this.skillUrl+id,{responseType: 'json'});
  }

  postDBSkill(skill : Skill) {
    const bodyRequest = {
      name: skill.name
    };
    return this.http.post<string>(this.skillUrl, bodyRequest,{responseType:'json'});
  }

  putDBSkill(skill : Skill) {
    const bodyRequest = {
      name: skill.name
    };
    console.log(this.skillUrl);
    return this.http.put<string>(this.skillUrl+skill.id, bodyRequest,{responseType:'json'});
  }
  
  deleteDBSkill(id : number) {
    return this.http.delete<string>(this.skillUrl+id,{responseType:'json'});
  }
  
  /********************************************
   BELOW IS LINE WILL BE LOCAL STORAGE FUNCTIONS
  ********************************************/
//   getSkills() : Skill[] {
//     return Skills();
//   }

//   setSkill(skill : Skill){
//     const skills = this.getSkills();
//     skills.push(skill);
//     window.localStorage.setItem('skill-list',JSON.stringify(skills));
//   }
  

//   getSkill(skillID : number) : Observable<Skill>{
//     const skill = Skills().find(sk => sk.id === skillID)!;
//     return of(skill);
//   }

//   updateSkill(skill : Skill) : void {
//     let skills = this.getSkills();
//     const index = skills.findIndex( sk => sk.id === skill.id );
//     if(index >= 0){
//       skills[index].name = skill.name;
//       window.localStorage.setItem('skill-list',JSON.stringify(skills));
//     }
//   }

//   removeSkill(skillID : number) : void {
//     let skills = Skills().filter( (skill) => skill.id !== skillID );
//     window.localStorage.setItem('skill-list',JSON.stringify(skills));
//   }

}
