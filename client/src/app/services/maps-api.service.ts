import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsApiService {
  private url = 'http://localhost:3000/api/get-maps-api';

  constructor(private http: HttpClient) { }

  getMapsApiKey(): Observable<any> {
    return this.http.get(this.url);
  }

  // loadApi(apiKey: string): Promise<void> {
  //   console.log('loading')
  //   return new Promise((resolve, reject) => {
  //     const script = document.createElement('script');
  //     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
  //     script.async = true;
  //     script.defer = true;
  //     script.onload = () => resolve();
  //     script.onerror = (error: any) => reject(error);
  //     document.head.appendChild(script);
  //   });
  // }

}
