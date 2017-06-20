import { GalleryImage } from './../models/galleryImage';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { PopUpService } from "../services/popup.service";

@Injectable()
export class TraineeService {

  constructor(
    @Inject("apiRoot") private apiRoot,
    private http: Http,
    private popUpService: PopUpService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  user: any;

  submitNewInfo(basicInfoForm: any, isValid: boolean) {
    if (isValid) {
      let optionalBody = '';
      for (let x = 6; x < Object.keys(basicInfoForm).length; x++) {
        let value = (<any>Object).values(basicInfoForm)[x];
        if (value !== null && value !== "") {
          optionalBody += `&${Object.keys(basicInfoForm)[x]}=${(<any>Object).values(basicInfoForm)[x]}`;
        }
      }
      let merge = Object.assign(this.user, basicInfoForm);
      let body = `name=${merge.name}&email=${merge.email}&phone=${merge.phone}&gender=${merge.gender}&kennitala=${merge.kennitala}&height=${merge.height}&jobDifficulty=${merge.jobDifficulty}&address=${merge.address}&country=${merge.country}&zipcodes_ZIP=${merge.zipcodes_ZIP}&jobDifficulty=${merge.jobDifficulty}` + optionalBody;
      let url = this.apiRoot + "api/Customer/UpdateCustomer";
      let token = localStorage.getItem('access_token');
      let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
      let requestOptions = new RequestOptions({ headers: headers });
      this.http.put(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {        
          localStorage.setItem('user', JSON.stringify(data));
          this.user = data;
          this.popUpService.successMessage("Info updated", "Just now");
        },
        error => {
          this.popUpService.errorMessage("Sorry something went wrong");
        }
        )
    }
  }

  saveProfileImage(image: string) {
    if(image != this.user.profileImagePath){
      let url = this.apiRoot + "api/Customer/UpdateProfileImage";
      let token = localStorage.getItem('access_token');
      let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
      let requestOptions = new RequestOptions({ headers: headers });
      let body = `profileImagePath=${image}`;
      this.http.put(url, body, requestOptions)
        .map(res => res.json())
        .subscribe((data) => {
          let user = JSON.parse(localStorage.getItem('user'));
          user.profileImagePath = data;
          localStorage.setItem('user', JSON.stringify(user));
          this.user = user;
          this.popUpService.successMessage("Profile image updated", "Just now");
        },
        error => {
          this.popUpService.errorMessage("Sorry something went wrong");
        }
        )
    }
  }

  saveProgressImage(base64Image){
    let url = this.apiRoot  + "api/ProgressImage/Add";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({'Authorization': "Bearer " + token, 'Content-type': 'application/x-www-form-urlencoded'});
    let requestOptions = new RequestOptions({ headers: headers});
    let body = `=${base64Image}`;
    return new Promise((resolve) => {
      this.http.post(url, body, requestOptions)
        .map(res => res.json())
        .subscribe(data =>{
          resolve(data);
        })
    
    });
  }

  getProgressImages(){
    let url = this.apiRoot + "api/ProgressImage/GetAllByCID";
    let token = localStorage.getItem('access_token');
    let headers = new Headers({ 'Authorization': "Bearer " + token, 'Content-Type': 'application/x-www-form-urlencoded' });
    let requestOptions = new RequestOptions({ headers: headers });
    return new Promise((resolve) => {
      this.http.get(url, requestOptions)
        .map(res => res.json())
        .subscribe(data =>{
          resolve(data);
          console.log("roughSize " + ((this.roughSizeOfObject(data)/ 1048576).toFixed(3)) + " MB");

        })
    
    });
  }
  
  public pictures = [];
  prepImagesForGallery(data){
    this.pictures = [];
    for(let x = 0; x < data.length; x++){
      let image = new GalleryImage(
        data[x].date,
        'data:image/png;base64,' + data[x].image
      );
      this.pictures.push(image);
    }
  }

  roughSizeOfObject( object ) {

    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes += 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList.push( value );

            for( var i in value ) {
                stack.push( value[ i ] );
            }
        }
    }
    return bytes;
}


}
