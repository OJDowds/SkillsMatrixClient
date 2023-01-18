import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Skill } from './skill';
import { SkillsService } from './skills.service';


import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './skill-edit.component.html'
})
export class SkillEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  pageTitle = 'Skill Edit';
  errorMessage!: '';
  skillForm!: FormGroup;

  skill!: Skill;
  private sub!: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return this.skillForm.get('tags') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private skillsService: SkillsService) {


    this.validationMessages = {
      skillName: {
        required: 'Skill name is required.',
        minlength: 'Skill name must be at least three characters.',
        maxlength: 'Skill name cannot exceed 50 characters.'
      },
      skillCode: {
        required: 'Skill code is required.'
      }
      
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.skillForm = this.fb.group({
      skillName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      skillCode: ['', Validators.required],
    });


    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.getSkill(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));


    merge(this.skillForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.skillForm);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  getSkill(id: number): void {
    this.skillsService.getSkill(id)
      .subscribe({
        next: (skill: Skill) => this.displaySkill(skill),
        error: err => this.errorMessage = err
      });
  }

  displaySkill(skill: Skill): void {
    if (this.skillForm) {
      this.skillForm.reset();
    }
    this.skill = skill;

    if (this.skill.id === 0) {
      this.pageTitle = 'Add Skill';
    } else {
      this.pageTitle = `Edit Skill: ${this.skill.skillName}`;
    }

 
    this.skillForm.patchValue({
      skillName: this.skill.skillName,
      skillLevel: this.skill.skillLevel
    });
    this.skillForm.setControl('tags', this.fb.array(this.skill.tags || []));
  }

  deleteSkill(): void {
    if (this.skill.id === 0) {
      this.onSaveComplete();
    } else {
      if (confirm(`Delete the skill: ${this.skill.skillName}?`)) {
        this.skillsService.deleteSkill(this.skill.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveSkill(): void {
    if (this.skillForm.valid) {
      if (this.skillForm.dirty) {
        const s = { ...this.skill, ...this.skillForm.value };

        if (s.id === 0) {
          this.skillsService.createSkill(s)
          .subscribe({
            next: x => {
              console.log(x);
              return this.onSaveComplete();
            },
            error: err => this.errorMessage = err
          });
        } else {
          this.skillsService.updateSkill(s)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } 
    
    else 
    {
      this.errorMessage = this.errorMessage;
    }
  }

  onSaveComplete(): void {
    this.skillForm.reset();
    this.router.navigate(['/skills']);
  }
}
