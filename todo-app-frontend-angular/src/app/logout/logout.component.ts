import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    public hardCodedAuthenticationService: HardcodedAuthenticationService) { }

  ngOnInit(): void {
    this.hardCodedAuthenticationService.logout();
  }

}
