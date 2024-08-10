import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartData, ChartOptions } from 'chart.js';

// Define type for chart data
interface LineChartData extends ChartData<'line'> {}

// Define type for chart options
interface LineChartOptions extends ChartOptions<'line'> {}

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.less'
})
export class ViewComponent {
  data: LineChartData
  options: LineChartOptions

  constructor() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Performance',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
        }
      ]
    }
    this.options = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.label + ': ' + tooltipItem.raw;
            }
          }
        }
      }
    };
  }
}
