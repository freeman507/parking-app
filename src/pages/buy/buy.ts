import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppService } from '../../app/app.service';

@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class BuyPage {

  value: number;

  constructor(
    private navCtrl: NavController,
    private appService: AppService) { }

  buy() {
    if (this.value) {
      this.navCtrl.pop();
    }
  }

  onChangeValue(value) {
    this.appService.value += (+value);
  }

}
