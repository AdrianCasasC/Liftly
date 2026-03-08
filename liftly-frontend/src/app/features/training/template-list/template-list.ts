import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TemplateMockService } from '../../../../core/services/mock/template-mock.service';
import { TrainingTemplate } from '../../../../core/models/training-template.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-template-list',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  templateUrl: './template-list.html'
})
export class TemplateList implements OnInit {
  private templateService = inject(TemplateMockService);
  templates$!: Observable<TrainingTemplate[]>;

  ngOnInit() {
    this.templates$ = this.templateService.getTemplates();
  }
}
