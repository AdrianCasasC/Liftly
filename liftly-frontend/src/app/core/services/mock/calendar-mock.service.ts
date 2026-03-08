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

  getWorkouts(monthStr: string): Observable<CalendarWorkout[]> {
    const parts = monthStr.split('-');
    const year = parts[0];
    const month = parts[1];
    return this.http.get<CalendarWorkout[]>(`${this.apiUrl}/month?year=${year}&month=${month}`);
  }

  scheduleWorkout(workout: Partial<CalendarWorkout>): Observable<CalendarWorkout> {
    return this.http.post<CalendarWorkout>(this.apiUrl, workout);
  }
}
