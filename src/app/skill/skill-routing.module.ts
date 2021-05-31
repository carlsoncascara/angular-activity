import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillEditComponent } from './skill-edit/skill-edit.component';
import { SkillsComponent } from './skills/skills.component';

const routes: Routes = [
  { path: "skill", component: SkillsComponent },
  { path: "skill-detail/:id", component: SkillEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillRoutingModule { }
