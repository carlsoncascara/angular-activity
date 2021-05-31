import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SkillRoutingModule } from './skill-routing.module';
import { SkillsComponent } from './skills/skills.component';
import { SkillEditComponent } from './skill-edit/skill-edit.component';


@NgModule({
  declarations: [
    SkillsComponent,
    SkillEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SkillRoutingModule
  ]
})
export class SkillModule { }
