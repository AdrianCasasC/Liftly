import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeightMockService } from '../../core/services/mock/weight-mock.service';
import { NotificationService } from '../../core/services/notification.service';
import { WeightLog } from '../../core/models/weight-log.interface';
import { NgxEchartsDirective } from 'ngx-echarts';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent, AxisPointerComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([LineChart, GridComponent, TooltipComponent, TitleComponent, AxisPointerComponent, CanvasRenderer]);

@Component({
  selector: 'app-weight',
  standalone: true,
  imports: [ReactiveFormsModule, NgxEchartsDirective, CommonModule],
  templateUrl: './weight.html'
})
export class Weight implements OnInit {
  private fb = inject(FormBuilder);
  private weightService = inject(WeightMockService);
  private notificationService = inject(NotificationService);

  logs: WeightLog[] = [];
  chartOptions: any;
  chartInstance: any;

  logForm = this.fb.group({
    weight: ['', [Validators.required, Validators.min(1)]],
    date: [new Date().toISOString().substring(0, 10), Validators.required]
  });

  isSubmitting = false;

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs() {
    this.weightService.getLogs().subscribe((logs: any) => {
      this.logs = logs.map((log: any) => {
        if (Array.isArray(log.loggedDate)) {
          const [year, month, day] = log.loggedDate;
          log.loggedDate = new Date(year, month - 1, day).toISOString();
        }
        return log;
      }).sort((a: any, b: any) => new Date(a.loggedDate).getTime() - new Date(b.loggedDate).getTime());
      this.updateChart();
    });
  }

  updateChart() {
    const dates = this.logs.map(log => {
      const d = new Date(log.loggedDate);
      return `${d.getMonth() + 1}/${d.getDate()}`;
    });
    const weights = this.logs.map(log => log.weight);

    this.chartOptions = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates
      },
      yAxis: {
        type: 'value',
        scale: true,
        name: 'Weight (kg)'
      },
      series: [
        {
          name: 'Weight',
          type: 'line',
          data: weights,
          areaStyle: {
            color: 'rgba(59, 130, 246, 0.2)'
          },
          lineStyle: {
            color: '#3b82f6',
            width: 3
          },
          itemStyle: {
            color: '#2563eb'
          },
          smooth: true
        }
      ]
    };
  }

  onChartInit(ec: any) {
    this.chartInstance = ec;
  }

  onSubmit() {
    if (this.logForm.valid) {
      this.isSubmitting = true;
      const formVal = this.logForm.value;
      const newLog = {
        weight: Number(formVal.weight),
        loggedDate: formVal.date as string // formVal.date is already YYYY-MM-DD from the input
      };

      this.weightService.addLog(newLog).subscribe({
        next: (log: any) => {
          if (Array.isArray(log.loggedDate)) {
            const [year, month, day] = log.loggedDate;
            log.loggedDate = new Date(year, month - 1, day).toISOString();
          }
          this.logs.push(log);
          this.logs.sort((a: any, b: any) => new Date(a.loggedDate).getTime() - new Date(b.loggedDate).getTime());
          this.updateChart();
          this.isSubmitting = false;
          this.logForm.patchValue({ weight: '' });
          this.notificationService.showSuccess('Weight log added successfully!');
        },
        error: () => {
          this.isSubmitting = false;
          this.notificationService.showError('Failed to add weight log.');
        }
      });
    }
  }
}
