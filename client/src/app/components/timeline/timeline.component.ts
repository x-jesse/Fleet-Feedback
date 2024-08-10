// timeline.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, TimelineModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.less']
})
export class TimelineComponent {
  events!: any[];

  ngOnInit() {
    this.events = [
      { status: '2021', date: '01/01/2021', description: 'New Year\'s Day' },
      { status: '2021', date: '14/02/2021', description: 'Valentine\'s Day' },
      { status: '2021', date: '17/03/2021', description: 'St. Patrick\'s Day' },
      { status: '2021', date: '25/12/2021', description: 'Christmas Day' }
    ];
  }
}
