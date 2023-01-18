import { TestBed } from '@angular/core/testing';

import { SkillDetailGuard } from './skill-detail.guard';

describe('SkillDetailGuard', () => {
  let guard: SkillDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SkillDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
