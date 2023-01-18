import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { SkillEditComponent } from './skill-edit.component';

@Injectable({
  providedIn: 'root'
})
export class SkillEditGuard implements CanDeactivate<SkillEditComponent> {
  canDeactivate(component: SkillEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.skillForm.dirty) {
      const skillName = component.skillForm.get('skillName')?.value || 'New Skill';
      return confirm(`Navigate away and lose all changes to ${skillName}?`);
    }
    return true;
  }
}
