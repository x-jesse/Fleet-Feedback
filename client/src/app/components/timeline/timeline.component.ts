// timeline.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, TimelineModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.less']
})
export class TimelineComponent {
  events!: any[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.events = [
      { id: 0, status: '2021', date: '01/01/2021', description: 'New Year\'s Day' },
      { id: 1, status: '2021', date: '14/02/2021', description: 'Valentine\'s Day' },
      { id: 2, status: '2021', date: '17/03/2021', description: 'St. Patrick\'s Day' },
      { id: 3, status: '2021', date: '25/12/2021', description: 'Christmas Day' }
    ];
  }
  activeEventId: string | null = null;

  setActiveEvent(eventId: string) {
    this.activeEventId = eventId;
  }

  isActive(eventId: string): boolean {
    return this.activeEventId === eventId;
  }

  reconstruct() {
    this.router.navigate(['/reconstruct']);
  }
}
