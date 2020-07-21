import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  public addFadeInClass: boolean = false;
  private amountScrolled: number = 0;
  @ViewChild('searchbox') searchbox: ElementRef;
  @ViewChild('searchInputElement') searchInputElement: ElementRef;

  public searchInput: string = '';
  public showSearchBoxInputDiv: boolean = false;


  @HostListener('window:scroll') onWindowScroll(e: any) {
    if (window.scrollY > this.amountScrolled) {
     this.addFadeInClass = true
    } else if (window.scrollY <= this.amountScrolled) {
      this.addFadeInClass = false;
    }
  }

  constructor() {}

  ngOnInit(): void {}
  
  public onSearchBoxIconClick(): void {
    if (this.showSearchBoxInputDiv) {
      this.searchInputElement.nativeElement.style.width = '0px';
      setTimeout(() => {
        this.searchbox.nativeElement.style.backgroundColor="transparent";
        this.searchbox.nativeElement.style.border="none";
        this.showSearchBoxInputDiv = false;
      }, 300);
    } else {
      this.showSearchBoxInputDiv = true;
      setTimeout(() => {
        this.searchbox.nativeElement.style.backgroundColor="rgba(0,0,0,.75)";
        this.searchbox.nativeElement.style.border="solid 1px rgba(255,255,255,.85)";
        this.searchInputElement.nativeElement.style.width = '212px';
      }, 0);
    }
  }

  public onSearchInputDivClose(event: Event): void {
    event.stopPropagation();
    this.searchInput = '';
  }
}
