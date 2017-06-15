import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LandingPageService } from './../landing-page.service';

@Component({
  selector: 'app-register-trainee',
  templateUrl: './register-trainee.component.html',
  styleUrls: ['./register-trainee.component.css']
})
export class RegisterTraineeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private landingPageService: LandingPageService 
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      +params['id'];
        this.landingPageService.getTrainerCard(+params['id']);
    });
  }
}
