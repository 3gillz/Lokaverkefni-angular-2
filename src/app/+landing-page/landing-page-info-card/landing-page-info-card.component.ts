import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-landing-page-info-card',
  templateUrl: './landing-page-info-card.component.html',
  styleUrls: ['./landing-page-info-card.component.css']
})
export class LandingPageInfoCardComponent implements OnInit {

  @Input() role: string;

  constructor( ) { }

  ngOnInit() {}

}
