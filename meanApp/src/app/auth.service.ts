import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private regurl = "http://localhost:3000/api/register";
  private logurl = "http://localhost:3000/api/login";

  constructor(private http : HttpClient, private router : Router) { }

  register_user(user){
   return this.http.post<any>(this.regurl,user);
  }
  login_user(user){
    return this.http.post<any>(this.logurl,user);
  } 


getToken(){
  return localStorage.getItem('token');
}

  loggedIn(){
   
    let a = localStorage.getItem('token');
    if(a!=null || a!=undefined){
      return true;
    } else {
      return false;
    }
  }
  
  logOutuser(){
    localStorage.removeItem('token');
    this.router.navigate(['/events']);
  }
} 
