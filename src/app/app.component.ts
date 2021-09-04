import { Component, VERSION } from '@angular/core';
import { LaunchdarklyService } from './launchdarkly.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Feature Toggle Sample';
  constructor(private ldSvc: LaunchdarklyService) {
    console.log('AppComponent');
    console.log(this.ldSvc.flag);
    if (this.ldSvc.flag == true) {
      this.name = 'AppComponent - Flag is on ';
    } else {
      this.name = 'AppComponent - Flag is off ';
    }
  }
  message: string;

  receiveMessage($event) {
    this.name = $event;
  }
}
