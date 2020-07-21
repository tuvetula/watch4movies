import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  public windowInnerWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

  constructor() {
   }
}
