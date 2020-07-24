import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found404',
  template: `<div class="h-100" fxLayout="column" fxLayoutAlign="center center"fxLayoutGap="16px">
  <h1>Erreur 404: Page non trouvée</h1>
  <button mat-raised-button color="warn" routerLink="/">Retour à l'accueil</button>
  </div>`,
})
export class PageNotFound404Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
