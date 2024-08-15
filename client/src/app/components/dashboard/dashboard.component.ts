import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TimelineComponent } from '../timeline/timeline.component';
import { TableModule } from 'primeng/table';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TabViewModule, TimelineComponent, TableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less'
})
export class DashboardComponent implements OnInit {
  trip_date = 'August 1, 2024';
  num_incidents = 0;
  csa_score = 80;
  total_distance: string = '';
  trip_duration: string = '';
  average_speed: string = '';
  fuel_efficiency: string = '';
  driver_rating: string = '';
  weather_conditions: string = '';
  eco_driving_score: string = '';
  route_highlights: string = '';
  incidents: any[] = [];

  trips: any[] = [
    { id: 1, date: '2024-01-01', description: 'New Year\'s Trip', incidents: 2, csaScore: 85 },
    { id: 2, date: '2024-01-15', description: 'Mid-January Trip', incidents: 1, csaScore: 90 },
    { id: 3, date: '2024-02-01', description: 'February Start Trip', incidents: 3, csaScore: 80 },
  ];

  constructor (private tripsService: TripsService) {}

  ngOnInit(): void {
    this.tripsService.getIncidents(1234).subscribe((data) => {
      this.incidents = data;
    });
  }

}
