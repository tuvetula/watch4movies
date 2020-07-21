import { Component, HostListener } from '@angular/core';
import { ScreenSizeService } from './shared/services/screen-size.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(
    private screenSizeService: ScreenSizeService 
  ){}
  
  @HostListener('window:resize',['$event'])
  windowResize(event: { target: { innerWidth: number; }; }): void {
    this.screenSizeService.windowInnerWidth.next(event.target.innerWidth);
  }
}
