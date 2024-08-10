import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TimelineComponent } from '../timeline/timeline.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TabViewModule, TimelineComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less'
})
export class DashboardComponent {
  trip_date = 'August 1, 2024';
  num_incidents = 0;
  csa_score = 80;

  constructor () {}

}
