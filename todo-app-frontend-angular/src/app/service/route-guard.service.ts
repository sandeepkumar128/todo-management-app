import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
  //this RouteGuardService needs to implement CanActivate before we can use it to guard our routes

  //adding router in constructor to take us back to login page
  constructor(
    public hardCodedAuthenticationService: HardcodedAuthenticationService,
    private router:Router
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.hardCodedAuthenticationService.isUserLoggedIn()){
      return true;
    } 
    this.router.navigate(['login']);
    
    return false;
  }
}
