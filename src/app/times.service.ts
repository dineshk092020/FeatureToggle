import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TimesService {
  times: any[];

  constructor() {
    this.times = [
      { id: '1234', name: 'Feature Toggle Tutorial' },
      { id: '5678', name: 'Travel Agency Demo' },
      { id: 'ABCD', name: 'Yet another project' }
    ];
  }

  get(): Observable<any[]> {
    return Observable.create(observer => {
      observer.next(this.times);
      observer.complete();
    });
  }
}
