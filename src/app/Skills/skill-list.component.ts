import { Component, OnInit } from "@angular/core";

import { Skill } from "./skill";
import { SkillsService } from "src/app/Skills/skills.service";

@Component({
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {
  pageTitle = 'Skill List';
  errorMessage = '';


  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredSkills = this.listFilter ? this.performFilter(this.listFilter) : this.skills;
  }

  filteredSkills: Skill[] = [];
  skills: Skill[] = [];

  constructor(private skillsService: SkillsService) {}

  performFilter(filterBy: string): Skill[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.skills.filter((skill: Skill) =>
      skill.skillName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  // toggleImage(): void {
  //   this.showImage = !this.showImage;
  // }

  ngOnInit(): void {
    this.skillsService.getSkills().subscribe({
      next: skills => {
        this.skills = skills;
        this.filteredSkills = this.skills;
      },
      error: err => this.errorMessage = err
    });
  }
}
