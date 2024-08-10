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
    ViewComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit {
  items!: MenuItem[]
  sidebarCollapsed = false;

  ngOnInit() {
    this.items = [
      {
        label: 'File',
        items: [
          { label: 'New', icon: 'pi pi-fw pi-plus'},
          { label: 'Open', icon: 'pi pi-fw pi-folder-open' },
          { label: 'Quit', icon: 'pi pi-fw pi-power-off' }
        ]
      },
      {
        label: 'Edit',
        items: [
          { label: 'Undo', icon: 'pi pi-fw pi-undo' },
          { label: 'Redo', icon: 'pi pi-fw pi-redo' }
        ]
      },
      {
        label: 'Help',
        items: [
          { label: 'Contents', icon: 'pi pi-fw pi-file' },
          { label: 'Search', icon: 'pi pi-fw pi-search' }
        ]
      }
    ]
  }

  collapseSidebar() {
    console.log(this.sidebarCollapsed)
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
