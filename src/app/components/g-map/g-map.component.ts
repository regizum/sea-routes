import {
  AfterViewInit,
  OnChanges,
  Component,
  ElementRef,
  ViewChild,
  Input,
  SimpleChanges,
} from '@angular/core';
import {} from 'googlemaps';
import { IRoute } from '@shared/types/routes';

/**
 * This component is used to display route on the map.
 * It uses Google Maps API to draw polylines and markers.
 * It also uses the route data to calculate the color of the polyline based on the speed.
 *
 * Usage example:
 * <g-map [route]="route"></g-map>
 */
@Component({
  selector: 'g-map',
  templateUrl: './g-map.component.html',
})
export class GMapComponent implements AfterViewInit, OnChanges {
  @ViewChild('gmapContainer', { static: false }) gmap: ElementRef;
  // The route to display on the map
  @Input() route: IRoute | null;

  map: google.maps.Map;
  coordinates = new google.maps.LatLng(25.276987, 55.296249);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 10,
  };
  polylines: google.maps.Polyline[] = [];
  markers: google.maps.Marker[] = [];
  maxSpeed: number = 20;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['route'] && changes['route'].currentValue) {
      this.cleanMap();
      let route = changes['route'].currentValue;
      this.drawPoints(route);
    }

    if (changes['route'] && !changes['route'].currentValue && this.map) {
      this.cleanMap();
      this.map.setCenter(this.coordinates);
    }
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
  }

  drawPoints(route: IRoute) {
    let routesCoordinates: google.maps.ReadonlyLatLngLiteral[] = [];
    let points;
    let bounds = new google.maps.LatLngBounds();

    this.addMarkers(route);

    route.points.forEach((pointsArray) => {
      routesCoordinates.push({
        lng: +pointsArray[0],
        lat: +pointsArray[1],
      } as google.maps.ReadonlyLatLngLiteral);

      if (routesCoordinates.length > 1) {
        let polylinePath = new google.maps.Polyline({
          path: routesCoordinates,
          geodesic: true,
          strokeColor: this.getColor(pointsArray[3]),
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });
        polylinePath.setMap(this.map);
        points = polylinePath.getPath().getArray();
        bounds.extend(points[0]);
        bounds.extend(points[1]);

        this.polylines.push(polylinePath);

        routesCoordinates.shift();
      }
    });

    this.map.fitBounds(bounds);
  }

  // Get color for the point based on speed. If the speed is 0, the color is red, if the speed is 20, the color is green.
  private getColor(speed: number) {
    let value = 100 - (speed / this.maxSpeed) * 100;

    if (value > 100) {
      value = 100;
    } else if (value < 0) {
      value = 0;
    }
    let r = Math.floor((255 * value) / 100),
      g = Math.floor((255 * (100 - value)) / 100),
      b = 0;

    return (
      '#' +
      this.componentToHex(r) +
      this.componentToHex(g) +
      this.componentToHex(b)
    );
  }

  // Convert number to hex
  private componentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }

  // Remove all polylines and markers from map
  private cleanMap() {
    this.polylines.forEach((polyline) => {
      polyline.setMap(null);
    });

    this.polylines = [];

    this.markers.forEach((marker) => {
      marker.setMap(null);
    });

    this.markers = [];
  }

  // Add origin and destination markers to map
  private addMarkers(route: IRoute) {
    let origin = route.points[0];
    let destination = route.points[route.points.length - 1];

    let originLatLng = {
      lng: origin[0],
      lat: origin[1],
    };
    let destinationLatLng = {
      lng: destination[0],
      lat: destination[1],
    };

    let markerOrigin = new google.maps.Marker({
      position: originLatLng,
      map: this.map,
      title: route.from_port,
    });

    let markerDestination = new google.maps.Marker({
      position: destinationLatLng,
      map: this.map,
      title: route.to_port,
    });

    this.markers.push(markerOrigin);
    this.markers.push(markerDestination);
  }
}
