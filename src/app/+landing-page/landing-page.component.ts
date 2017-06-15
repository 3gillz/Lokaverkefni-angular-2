import { LandingPageService } from './landing-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div id="extr-page" style="overflow-y:hidden">
      <router-outlet></router-outlet>
    </div>
  `,
  providers: [ LandingPageService ]
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
