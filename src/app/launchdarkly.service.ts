import {
  Injectable,
  Component,
  Output,
  Input,
  EventEmitter
} from '@angular/core';
import { Subject } from 'rxjs';
import * as LDClient from 'launchdarkly-js-client-sdk';
import { FlagNames } from './flagnames';

@Injectable()
export class LaunchdarklyService {
  public client;
  private user;
  public flag;
  private flags: any;
  flagChange: Subject<any> = new Subject<any>();

  message: string = 'Hola Test!';

  //@Output() messageEvent = new EventEmitter<string>();
  @Output() messageEvent: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.user = { key: 'qa', anonymous: true };
    this.client = LDClient.initialize('613196e03eb897267017a321', this.user);
    this.client.setStreaming(true);

    // Set all the flag values when the client initializes
    this.client.on('ready', () => {
      console.log('Ready.');
      this.setFlags();
    });

    this.client.on('change', (flags: any) => {
      console.log('Flags changed.');
      // iterate through all flags that have been updated
      for (let flag in flags) {
        // take the current value of the flag
        this.flags[flag] = flags[flag].current;
      }

      // Update any subscribers to the flagChanged topic
      this.flagChange.next(this.flags);
      console.log('Flags updated.');
    });
  }
  /*
    Requires a FlagName type be passed in. Defaults to False (i.e. disabled)
    if the FlagName does not exist in LaunchDarkly, and warns about it.
  */
  getFlag(flagName: FlagNames): boolean {
    let flag = false;
    if (this.flags !== undefined) {
      flag = this.flags[flagName];
      if (flag == undefined) {
        console.log(
          'FIXME: Flag ' + flagName + ' queried but not found in LaunchDarkly!'
        );
        this.flags[flagName] = false;
        flag = false;
      }
    }
    return flag;
  }

  setFlags() {
    this.flags = this.client.allFlags();
    // Notify the subscribers just in case someone is watching this
    // before setup completes.  Shouldn't be, but you never know...
    this.flagChange.next(this.flags);
    console.log('Flags initialized.');
  }
}
