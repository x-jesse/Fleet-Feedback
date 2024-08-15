import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Trip {
  tripId: number;
  duration: number;
  offences: number;
  driverId: number;
}

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  private url = 'http://localhost:3000/api/trips/'

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  getIncidents(tripId: number): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.url}/incidents/${tripId}`);
  }
}
