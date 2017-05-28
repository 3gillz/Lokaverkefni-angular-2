import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
@Injectable()
export class TrainerService {

  constructor(
    @Inject("apiRoot") private apiRoot,
    private http: Http
  ) {}


}
