import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import response from '../data/catalog';
import { shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  public response$: Observable<any> = of(response).pipe(shareReplay());
  constructor() {
  }

  fetchData(): Observable<any> {
    return this.response$;
  }
}
