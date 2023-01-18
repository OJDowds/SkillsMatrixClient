import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { SkillListComponent } from './skill-list.component';
import { SkillDetailComponent } from './skill-detail.component';
import { SkillEditComponent } from './skill-edit.component';


import { RouterModule } from '@angular/router';
import { SkillEditGuard } from './skill-edit.guard';
import { SharedModule } from 'src/app/shared/shared.module';

// In Memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { SkillData } from './skill-data';



@NgModule({
  declarations: [
    SkillListComponent,
    SkillDetailComponent,
    SkillEditComponent

  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(SkillData),
    RouterModule.forChild([
      { path: 'skills', component: SkillListComponent },
      { path: 'skills/:id', component: SkillDetailComponent },
      {
        path: 'skills/:id/edit',
        canDeactivate: [SkillEditGuard],
        component: SkillEditComponent
      }
    ]),
  ]
})
export class SkillModule { }
