import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrchestrationService {
  private activeRestaurantId$$ = new Subject<string>();


  public activeRestaurantId$ = this.activeRestaurantId$$.asObservable();
  constructor() { }

  setActiveRestaurantId(uuid: string) {
    this.activeRestaurantId$$.next(uuid);
  }
}
