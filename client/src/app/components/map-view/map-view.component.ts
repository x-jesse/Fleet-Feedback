import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapsApiService } from '../../services/maps-api.service';
import { GoogleMapsModule } from '@angular/google-maps';


@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.less'
})
export class MapViewComponent implements OnInit {
  MAPS_API !: string;
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;
  options: google.maps.MapOptions = {
    mapId: "test",
    center: { lat: -31, lng: 147 },
    zoom: 4,
  }

  constructor(private mapsService: MapsApiService) {}

  ngOnInit(): void {
    this.mapsService.getMapsApiKey().subscribe((resp) => {
      this.MAPS_API = resp.apiKey;
      // this.mapsService.loadApi(resp.apiKey);
      this.loadGoogleMapsScript(resp.apiKey)
    });

  }

  loadGoogleMapsScript(apiKey: string): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Define the callback function
    (window as any).initMap = () => {
      this.initMap(); // Initialize the map once the script is loaded
    };
  }

  initMap(): void {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: this.center,
      zoom: this.zoom
    });
  }
}
