import {Injectable, ApplicationRef} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs/Rx";
import {config} from '../smartadmin.config';
import {languages} from './languages.model';
import {JsonApiService} from "../json-api.service";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class I18nService {

  public state;
  public data:{};
  public currentLanguage:any;
  public calendarLang: BehaviorSubject<string> = new BehaviorSubject<string>("en");

  constructor(private jsonApiService:JsonApiService, private ref:ApplicationRef) {
    this.state = new Subject();

    this.initLanguage(config.defaultLocale || 'us');
    this.fetch(this.currentLanguage.key)
  }

  private fetch(locale: any) {
    this.jsonApiService.fetch( `/langs/${locale}.json` )
      .subscribe((data:any)=> {
        this.data = data;
        this.state.next(data);
        this.ref.tick()
      })
  }

  private initLanguage(locale:string) {
    let language = languages.find((it)=> {
      return it.key == locale
    });
    if (language) {
      this.currentLanguage = language
    } else {
      throw new Error(`Incorrect locale used for I18nService: ${locale}`);

    }
  }

  setLanguage(language){
    this.currentLanguage = language;
    this.setCalendarlanguage(language.key)
    this.fetch(language.key)
  }

  setCalendarlanguage(key){
    if(key == "is"){
      this.calendarLang.next("is")
    }else{
      this.calendarLang.next("en")
    }
  }
  
  subscribe(sub:any, err:any) {
    return this.state.subscribe(sub, err)
  }

  public getTranslation(phrase:string):string {
    return this.data && this.data[phrase] ? this.data[phrase] : phrase
  }

}
