import { CustomerService } from './../../customer.service';
import { PopUpService } from './../../../services/popup.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-new-goal-modal',
  templateUrl: './new-goal-modal.component.html',
  styleUrls: ['./new-goal-modal.component.css']
})
export class NewGoalModalComponent implements OnInit {

  goalForm: FormGroup;
  public submitted: boolean = false;

  constructor(
    private popUpService: PopUpService,
    private customerService: CustomerService
  ) {
    this.goalForm = new FormGroup({
      kg: new FormControl('', <any>Validators.required),
      percentage: new FormControl('', <any>Validators.required),
      description: new FormControl('', <any>Validators.required),
      diameter: new FormControl('', <any>Validators),
      startDate: new FormControl('', ),
      dueDate: new FormControl('', )

    });
  }


  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Input() CID: number;

  ngOnInit() {
  }

  clear() {
    this.goalForm.reset();
    this.submitted = false;
  }
  closeModal() {
    this.close.emit();
  }
  submitGoal(goalForm) {
    this.submitted = true;
    let due = $('#dueDate').val();
    let start = $('#startDate').val();
    console.log(goalForm.valid);
    console.log(goalForm.value);
    if (goalForm.valid && due !== "" && start !== "") {


      this.customerService.addNewGoal(goalForm.value, due, start, this.CID)
        .then((resolve) => {        
            this.goalForm.reset();
            this.submitted = false;
            this.close.emit();
        });
    }
    
  }

}
