import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeightLog } from '../../models/weight-log.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeightMockService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/weight`;

  getLogs(): Observable<WeightLog[]> {
    return this.http.get<WeightLog[]>(this.apiUrl);
  }

  addLog(log: Partial<WeightLog>): Observable<WeightLog> {
    return this.http.post<WeightLog>(this.apiUrl, log);
  }
}
