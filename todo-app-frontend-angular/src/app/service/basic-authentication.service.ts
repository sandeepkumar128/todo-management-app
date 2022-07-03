import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

export const TOKEN = 'token'; 
export const AUTHENTICATED_USER = 'authenticatedUser'; 

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(
    private http:HttpClient
  ) { }

    //for basic authentication with username and password!
  executeAuthenticationService(username:string, password:string) {
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });
    return this.http.get<AuthenticationBean>(
      `http://localhost:8080/basicauth`,
      {headers}).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, basicAuthHeaderString);
            return data;
          }
        )
      );
  
      //The pipe method allows us to declare  what should be done if the 
      //request succeeds or if the request fails.  
  }

  executeJwtAuthenticationService(username:string, password:string) {
    return this.http.post<any>(
      `http://localhost:8080/authenticate`,
      {
        username,
        password
      }).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            return data;
          }
        )
      );
  
      //The pipe method allows us to declare  what should be done if the 
      //request succeeds or if the request fails.  
  }
  
  getAuthenticatedUser () {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
    return null;
  }


  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    //console.log("user: " + user + " "+ (user == null));
    return !(user == null);
  }

  logout () {
    sessionStorage.removeItem(AUTHENTICATED_USER);
  }


  

}

export class AuthenticationBean {
  constructor(public message:string) {}
}

