import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class EventService {

  private eventurl = "http://localhost:3000/api/events";
  private specialurl = "http://localhost:3000/api/special";



  constructor(private http : HttpClient) { }

  getEvents(){
    return this.http.get<any>(this.eventurl);
  }

  getSpecialEvents(){
    return this.http.get<any>(this.specialurl);
  }
}
