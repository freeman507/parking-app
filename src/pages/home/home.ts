import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { BuyPage } from '../buy/buy';
import { AppService } from '../../app/app.service';

declare var google;

interface Location {
  lat: number;
  long: number;
  marker?: any;
  isRemovable?: boolean;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;
  value: number;

  iconCar: string = 'assets/icon/car.png';
  iconParking: string = 'assets/icon/parking.png';

  myMarker: any;

  defaultMarkers: Location[] = [
    { lat: -25.7424221, long: -53.05604 },
    { lat: -25.7438239, long: -53.0557072 },
    { lat: -25.7629579, long: -53.0600277 },
    { lat: -25.75325440401894, long: -53.058464 },
    { lat: -25.7532544, long: -53.058464 },
    { lat: -25.7426103, long: -53.0599366 },
    { lat: -25.7417149, long: -53.0636379 },
    { lat: -25.754666, long: -53.0598114 }
  ];

  parkingIndex: number = 2;

  is1: boolean;
  is2: boolean;

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private appService: AppService) {
    this.appService.onAvailable = (v) => this.onAvailable(v);
    this.appService.onUnavailable = (v) => this.onUnavailable(v);
  }

  ionViewDidEnter() {
    this.value = this.appService.value;
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => this.setupMap());
  }

  setupMap() {

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    this.geolocation.getCurrentPosition(options)
      .then((resp) => {

        const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

        const mapOptions = {
          zoom: 13,
          center: position
        };

        if (!this.myMarker) {
          this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
          this.defaultMarkers.forEach((item) => this.setupParking(item));
        } else {
          this.defaultMarkers[this.parkingIndex].marker.setIcon(this.iconParking);
        }

        this.myMarker = new google.maps.Marker({
          position: position,
          map: this.map,
          icon: this.iconCar
        });

      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });

  }

  setupParking(item, icon?) {
    const position = new google.maps.LatLng(item.lat, item.long);

    item.marker = new google.maps.Marker({
      position: position,
      map: this.map,
      icon: icon || this.iconParking
    });

  }

  buy() {
    this.navCtrl.push(BuyPage);
  }

  onAvailable(value) {
    if (!this.myMarker) return;
    if (this.is1) return;
    this.is1 = true;
    this.is2 = false;

    //alert('livre');

    if (this.setupMap)
      this.setupMap();
  }

  onUnavailable(value) {
    if (!this.myMarker) return;
    if (this.is2) return;
    this.is2 = true;
    this.is1 = false;
    //alert('ocupado');

    this.myMarker.setVisible(false);

    this.defaultMarkers[this.parkingIndex].marker.setIcon(this.iconCar);

  }

}
