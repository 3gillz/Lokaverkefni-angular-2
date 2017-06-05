import { Component, OnInit, Inject, HostListener, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TrainerService } from '../../trainer.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {

  videoPlaying: boolean;
  videoUrl: SafeUrl;

  constructor(
    @Inject("apiRoot") private apiRoot,
    private http: Http,
    private sanitizer: DomSanitizer,
    private trainerService: TrainerService
  ) { 
  };

  @ViewChild('videoModal') videoModal;
  @HostListener('document:click', ['$event'])
  documentClick(event) {
    if(event.target.id === "video"){
      let code = event.target.value.split('=');
      this.videoUrl = this.sanitizeUrl(code[1]);
      this.videoModal.show();
      this.videoPlaying = true;
    }
    else if(event.target.id === "edit"){
      this.trainerService.getExerciseForEdit(event.target.value);
    }
  }
  closeVideoModal(){
    this.videoModal.hide();
    setTimeout(() => {
      this.videoPlaying = false;
    }, 500);
  }
  sanitizeUrl(youTubeCode: string) : SafeResourceUrl {
       let dangerousVideoUrl = 'https://www.youtube.com/embed/' + youTubeCode + "?autoplay=1";
      return this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
  }
  ngOnInit() {
  }

  public getAllCustomers = this.apiRoot + "api/Exercise/GetAllByTrid";
  token = localStorage.getItem('access_token');
  headers = new Headers({ 'Authorization': "Bearer " + this.token, 'Content-Type': 'application/x-www-form-urlencoded' });
  requestOptions = new RequestOptions({ headers: this.headers });
  options = {
    dom: "Bfrtip",
    ajax: (data, callback, settings) => {
      this.http.get(this.getAllCustomers, this.requestOptions)
        .map(this.extractData)
        .catch(this.handleError)
        .subscribe((data) => {
          callback({
            aaData: data
          })
        })
    },
    "iDisplayLength": 15,
    "columns": [
      {
        "class": 'details-control',
        "orderable": false,
        "data": null,
        "defaultContent": ''
      },
      {"data": "name"},
      {"data": "type"},
      {"data": "madeBy"}
    ], 
    "order": [[1, 'asc']]
  }
  public detailsFormat(d) {
    return `<table cell-padding="5" cell-spacing="0" border="0" class="table table-hover table-condensed">
            <tbody>
            <tr>
                <td style="width:100px">Name:</td>
                <td>${d.name}</td>
            </tr>
            <tr>
                <td>Type:</td>
                <td>${d.type}</td>
            </tr>
            <tr>
                <td>Link:</td>
                <td>${d.link}&#xA0;&#xA0;<button value=${d.link} id="video" class="btn btn-xs btn-primary">Watch Video</button></td>
            </tr>
            <tr>
                <td>Description:</td>
                <td>${d.description}</td>
            </tr>
            <tr>
                <td>Action:</td>
                <td><button id="edit" value="${d.EID}" class="btn btn-xs btn-success">Edit</button></td>
            </tr></tbody>
        </table>`
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  private extractData(res: Response) {
    let body = res.json();
    if (body) {
      return body.data || body
    } else {
      return {}
    }
  }
}
