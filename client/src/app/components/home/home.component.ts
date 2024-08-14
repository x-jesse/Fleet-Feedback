import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ViewComponent } from '../view/view.component';
import { Menu, MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { MapViewComponent } from '../map-view/map-view.component';
import { TripTableComponent } from '../trip-table/trip-table.component';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule, 
    InputTextModule,
    MatCardModule, 
    MatSidenavModule, 
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MenuModule,
    CommonModule,
    DashboardComponent,
    ViewComponent,
    MapViewComponent,
    TripTableComponent,
    ChatComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit {
  items!: MenuItem[]
  sidebarCollapsed = false;
  viewmode: number = 0;

  ngOnInit() {}

  setView(mode: number) {
    this.viewmode = mode;
  }

  collapseSidebar() {
    console.log(this.sidebarCollapsed)
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
