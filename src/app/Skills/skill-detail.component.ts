import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/Skills/skill';
import { SkillsService } from 'src/app/Skills/skills.service';

@Component({
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.css']
})
export class SkillDetailComponent implements OnInit {
  pageTitle = 'Skill Detail';
  errorMessage = '';
  skill: Skill | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private skillsService: SkillsService) {
  }

  ngOnInit(): void {
    const param = Number(this.route.snapshot.paramMap.get('id'));
    if (param) {
      const id = +param;
      this.getSkill(id);
    }
  }

  getSkill(id: number): void {
    this.skillsService.getSkill(id).subscribe({
      next: skill => this.skill = skill,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/skills']);
  }
}
