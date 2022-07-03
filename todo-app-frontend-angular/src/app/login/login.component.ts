import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = "sandeepx";
  password = "";
  invalidLogin = false;
  errorMessage = 'username and password are incorrect!';

  //router - dependency injection
  constructor(
    private router:Router,
    public hardcodedAuthenticationService: HardcodedAuthenticationService,
    public basicAuthenticationService: BasicAuthenticationService
    ) { }

  ngOnInit(): void {
  }

  handleLogin() {
    //console.log(this.username);
    //console.log(this.password);
    //if (this.username == 'Sandeep' && this.password == 'alpha') {
    if (this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
      //redirect to welcome page
      this.router.navigate(['welcome', this.username]);
      this.invalidLogin = false;
      console.log("Login: "+ this.username);
    } else {
      this.invalidLogin = true;
      console.log("Incorrect credentials!");
    }
  }

  //handle basic authenticatiom - with username and password
  handleBasicAuthLogin() {
    this.basicAuthenticationService.executeAuthenticationService(
      this.username, this.password).subscribe(
        data => {
          console.log("handleBasicAuthLogin >> success");
          console.log(data);
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
        }, 
        error => {
          console.log(error);
          this.invalidLogin = true;
          
        } 

    )
    
  }

  //handle jwt authentication - with jwt token
  handleJwtAuthLogin() {
    this.basicAuthenticationService.executeJwtAuthenticationService(
      this.username, this.password).subscribe(
        data => {
          console.log("handleJwtAuthLogin >> success");
          console.log(data);
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
        }, 
        error => {
          console.log(error);
          this.invalidLogin = true;
          
        } 

    )
    
  }

}
