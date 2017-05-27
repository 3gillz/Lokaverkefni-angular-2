import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div id="extr-page">
      <router-outlet></router-outlet>
    </div>
  `
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
