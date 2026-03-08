import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarWorkout } from '../../models/calendar-workout.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarMockService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/calendar`;

  getWorkouts(month: string): Observable<CalendarWorkout[]> {
    return this.http.get<CalendarWorkout[]>(`${this.apiUrl}/month?month=${month}`);
  }

  scheduleWorkout(workout: Partial<CalendarWorkout>): Observable<CalendarWorkout> {
    return this.http.post<CalendarWorkout>(this.apiUrl, workout);
  }
}
