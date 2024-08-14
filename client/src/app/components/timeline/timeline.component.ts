import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { Router } from '@angular/router';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, TimelineModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.less']
})
export class TimelineComponent {
  events!: any[];
  activeEventId: string | null = null;
  videoUrl!: string;

  constructor(private router: Router, private tripsService: TripsService) {}

  ngOnInit() {
    const videoId = 'test_file'
    this.videoUrl = `http://localhost:3000/api/trips/incidents/videos/${videoId}`;

    this.tripsService.getIncidents().subscribe(
      (data) => {
        console.log('getting');
        this.events = data;

        if (this.events.length > 0) {
          this.activeEventId = this.events[0].id.toString();
        }
      }
    );
  }

  setActiveEvent(eventId: string) {
    this.activeEventId = eventId;
  }

  isActive(eventId: string): boolean {
    return this.activeEventId === eventId;
  }
}
