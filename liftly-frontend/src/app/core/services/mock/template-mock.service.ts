import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrainingTemplate } from '../../models/training-template.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateMockService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/templates`;

  getTemplates(): Observable<TrainingTemplate[]> {
    return this.http.get<TrainingTemplate[]>(this.apiUrl);
  }

  getTemplate(id: number): Observable<TrainingTemplate> {
    return this.http.get<TrainingTemplate>(`${this.apiUrl}/${id}`);
  }

  createTemplate(template: Partial<TrainingTemplate>): Observable<TrainingTemplate> {
    return this.http.post<TrainingTemplate>(this.apiUrl, template);
  }
}
