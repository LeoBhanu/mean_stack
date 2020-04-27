import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

registeredData = {
  email : "",
  password : ""
};

  constructor(private auth : AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    this.auth.register_user(this.registeredData).subscribe(
      res => {console.log(res);
        localStorage.setItem('token',res.token)
      this.router.navigate(['/special'])},
      err => console.log(err)
    );
  }

}
