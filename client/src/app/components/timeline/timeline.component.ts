import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { Router } from '@angular/router';
import { TripsService } from '../../services/trips.service';
import { TooltipModule } from 'primeng/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, TimelineModule, TooltipModule, MatSidenavModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.less']
})
export class TimelineComponent {
  events!: any[];
  activeEventId: string | null = null;
  videoUrl!: string;
  pointerPosition: number = 9;

  constructor(private router: Router, private tripsService: TripsService) {}

  ngOnInit() {
    const videoId = 'test_file'
    // this.videoUrl = `http://localhost:3000/api/trips/incidents/videos/${videoId}`;

    this.tripsService.getIncidents(1234).subscribe(
      (data) => {
        console.log('getting', data);
        this.events = data;

        if (this.events.length > 0) {
          this.activeEventId = this.events[0]._id;
        }
      }
    );
  }

  setActiveEvent(eventId: string) {
    this.activeEventId = eventId;
    this.pointerPosition = this.calculatePointerPosition(eventId);
  }

  isActive(eventId: string): boolean {
    return this.activeEventId === eventId;
  }

  getActiveEvent() {
    return this.events.find(event => event._id === this.activeEventId);
  }

  calculatePointerPosition(eventId: string): number {
    const index = this.events.findIndex(event => event._id === eventId);
    const newpos =  (index / (this.events.length - 1)) * 74 + 9;
    console.log(newpos);
    return newpos;
  }
}
