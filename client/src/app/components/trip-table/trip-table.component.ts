import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { TripsService, Trip } from '../../services/trips.service';

@Component({
  selector: 'app-trip-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './trip-table.component.html',
  styleUrl: './trip-table.component.less'
})
export class TripTableComponent implements OnInit {
  displayedColumns: string[] = ['tripId', 'duration', 'offences'];
  dataSource: Trip[] = []

  constructor(private tripsService: TripsService) {}

  ngOnInit(): void {
    this.tripsService.getTrips().subscribe(data => {
      this.dataSource = data;
    })
  }
}
