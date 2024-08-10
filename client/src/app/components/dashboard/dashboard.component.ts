import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TabViewModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less'
})
export class DashboardComponent {
  constructor () {}
}
