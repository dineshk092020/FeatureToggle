import {
  Injectable,
  Component,
  Output,
  Input,
  EventEmitter
} from '@angular/core';
import * as LDClient from 'launchdarkly-js-client-sdk';

@Injectable()
export class LaunchdarklyService {
  public client;
  private user;
  public flag;
  message: string = 'Hola Test!';

  //@Output() messageEvent = new EventEmitter<string>();
  @Output() messageEvent: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.user = { key: '613196e03eb897267017a321' };
    this.client = LDClient.initialize('613196e03eb897267017a321', this.user);
    this.client.setStreaming(true);

    this.client.on('ready', () => {
      console.log('on ready ');
      if (this.client.variation('helloworld', false)) {
        console.log('ready - Flag is on ');
        this.message = 'ready - Flag is on';
        this.flag = true;
      } else {
        console.log('ready - Flag is off');
        this.message = 'ready - Flag is off';
        this.flag = false;
      }
      this.messageEvent.emit(this.message);
    });

    this.client.on('change', function(settings) {
      console.log('flags changed:', settings);
    });
  }
}
