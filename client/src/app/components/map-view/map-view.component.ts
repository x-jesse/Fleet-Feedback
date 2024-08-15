import { Component, OnInit } from '@angular/core';
import { MapsApiService } from '../../services/maps-api.service';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.less']
})
export class MapViewComponent implements OnInit {
  MAPS_API!: string;
  dirRenderer!: google.maps.DirectionsRenderer;
  dirService!: google.maps.DirectionsService;
  center!: google.maps.LatLng;
  haight!: google.maps.LatLng;
  oceanBeach!: google.maps.LatLng;
  zoom = 4;

  constructor(private mapsService: MapsApiService) {}

  ngOnInit(): void {
    this.mapsService.getMapsApiKey().subscribe((resp) => {
      this.MAPS_API = resp.apiKey;
      this.loadGoogleMapsScript(resp.apiKey);
    });
  }

  loadGoogleMapsScript(apiKey: string): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&loading=async`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Define the callback function
    (window as any).initMap = () => {
      this.initMap(); // Initialize the map once the script is loaded
    };
  }

  initMap(): void {
    // Initialize map-related services and variables
    this.dirService = new google.maps.DirectionsService();
    this.dirRenderer = new google.maps.DirectionsRenderer();
    this.center = new google.maps.LatLng(41.850033, -87.6500523);
    this.haight = new google.maps.LatLng(37.7699298, -122.4469157);
    this.oceanBeach = new google.maps.LatLng(37.7683909618184, -122.51089453697205);

    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: this.haight,
      zoom: this.zoom,
    });

    const req = {
      origin: this.haight,
      destination: this.oceanBeach,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.dirRenderer.setMap(map);
    this.dirService.route(req, (response, status) => {
      if (status === 'OK') {
        this.dirRenderer.setDirections(response);
      }
    });
  }
}
