import { Component, inject, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarMockService } from '../../core/services/mock/calendar-mock.service';
import { TemplateMockService } from '../../core/services/mock/template-mock.service';
import { CalendarWorkout } from '../../core/models/calendar-workout.interface';
import { TrainingTemplate } from '../../core/models/training-template.interface';

interface Day {
  date: Date;
  dateString: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  workouts: CalendarWorkout[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, FormsModule, DatePipe],
  templateUrl: './calendar.html'
})
export class Calendar implements OnInit {
  private calendarService = inject(CalendarMockService);
  private templateService = inject(TemplateMockService);

  currentDate = new Date();
  days: Day[] = [];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  allWorkouts: CalendarWorkout[] = [];
  templates: TrainingTemplate[] = [];

  selectedDay: Day | null = null;
  selectedTemplateId: number | null = null;
  isScheduling = false;

  ngOnInit() {
    this.loadData();
    this.loadTemplates();
  }

  loadData() {
    const monthStr = this.currentDate.toISOString().split('T')[0].substring(0, 7);
    this.calendarService.getWorkouts(monthStr).subscribe((workouts: any) => {
      this.allWorkouts = workouts;
      this.generateCalendar();
    });
  }

  loadTemplates() {
    this.templateService.getTemplates().subscribe((temps: any) => {
      this.templates = temps;
    });
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    this.days = [];
    const today = new Date();

    for (let i = 0; i < 42; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const ds = d.toISOString().split('T')[0];
      
      this.days.push({
        date: d,
        dateString: ds,
        isCurrentMonth: d.getMonth() === month,
        isToday: d.toDateString() === today.toDateString(),
        workouts: this.allWorkouts.filter(w => w.scheduledDate === ds)
      });
    }
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.loadData();
    this.selectedDay = null;
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.loadData();
    this.selectedDay = null;
  }

  selectDay(day: Day) {
    this.selectedDay = day;
  }

  scheduleWorkout() {
    if (this.selectedDay && this.selectedTemplateId) {
      this.isScheduling = true;
      const workoutReq = {
        templateId: Number(this.selectedTemplateId),
        scheduledDate: this.selectedDay.dateString,
      };

      this.calendarService.scheduleWorkout(workoutReq).subscribe({
        next: (res: any) => {
          // Re-load template details just for display usually we might want eager loading or keep it simple
          const template = this.templates.find(t => t.id === Number(this.selectedTemplateId));
          res.template = template;
          
          this.allWorkouts.push(res);
          this.selectedDay?.workouts.push(res);
          this.isScheduling = false;
          this.selectedTemplateId = null;
        },
        error: () => this.isScheduling = false
      });
    }
  }
}
