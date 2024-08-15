import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TimelineComponent } from '../timeline/timeline.component';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TabViewModule, TimelineComponent, TableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less'
})
export class DashboardComponent {
  trip_date = 'August 1, 2024';
  num_incidents = 0;
  csa_score = 80;

  trips: any[] = [
    { id: 1, date: '2024-01-01', description: 'New Year\'s Trip', incidents: 2, csaScore: 85 },
    { id: 2, date: '2024-01-15', description: 'Mid-January Trip', incidents: 1, csaScore: 90 },
    { id: 3, date: '2024-02-01', description: 'February Start Trip', incidents: 3, csaScore: 80 },
  ];

  constructor () {}

}
