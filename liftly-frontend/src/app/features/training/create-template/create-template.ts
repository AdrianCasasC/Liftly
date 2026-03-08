import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TemplateMockService } from '../../../../core/services/mock/template-mock.service';
import { ExerciseMockService } from '../../../../core/services/mock/exercise-mock.service';
import { Exercise } from '../../../../core/models/exercise.interface';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-create-template',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgFor, NgIf],
  templateUrl: './create-template.html'
})
export class CreateTemplate implements OnInit {
  private fb = inject(FormBuilder);
  private templateService = inject(TemplateMockService);
  private exerciseService = inject(ExerciseMockService);
  private router = inject(Router);

  exercisesList: Exercise[] = [];
  isLoading = false;

  templateForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    exercises: this.fb.array([])
  });

  ngOnInit() {
    this.exerciseService.getExercises().subscribe(exs => {
      this.exercisesList = exs;
    });
  }

  get exercises() {
    return this.templateForm.get('exercises') as FormArray;
  }

  addExercise() {
    const exerciseGroup = this.fb.group({
      exerciseId: ['', Validators.required],
      sets: [3, [Validators.required, Validators.min(1)]],
      reps: [10, [Validators.required, Validators.min(1)]],
      restTime: [90, [Validators.required, Validators.min(0)]]
    });
    this.exercises.push(exerciseGroup);
  }

  removeExercise(index: number) {
    this.exercises.removeAt(index);
  }

  onSubmit() {
    if (this.templateForm.valid) {
      this.isLoading = true;
      const formValue = this.templateForm.value;
      const newTemplate = {
        name: formValue.name as string,
        description: formValue.description as string || '',
        exercises: formValue.exercises as any[]
      };

      this.templateService.createTemplate(newTemplate).subscribe({
        next: () => {
          this.router.navigate(['/training']);
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
