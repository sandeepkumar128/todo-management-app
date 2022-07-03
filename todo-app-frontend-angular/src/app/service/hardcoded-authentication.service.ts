import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username: string, password: string) {
    if (username == "Sandeep" && password == "alpha") {
      sessionStorage.setItem('authenticatedUser', username);
      return true;

    }
    return false;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    //console.log("user: " + user + " "+ (user == null));
    return !(user == null);
  }

  logout () {
    sessionStorage.removeItem('authenticatedUser');
  }

  
}
