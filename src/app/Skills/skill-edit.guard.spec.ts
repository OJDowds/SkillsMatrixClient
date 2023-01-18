import { TestBed, async, inject } from '@angular/core/testing';

import { SkillEditGuard } from './skill-edit.guard';

describe('SkillEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkillEditGuard]
    });
  });

  it('should ...', inject([SkillEditGuard], (guard: SkillEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});