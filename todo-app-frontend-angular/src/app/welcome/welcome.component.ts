import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelloWorldBean, WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  message ="Some welcome message!"
  welcomeMsgFromService = ""
  name:string = "";
  

  //ActivatedRoute 
  constructor(private route: ActivatedRoute,
              private service: WelcomeDataService) { }

  ngOnInit(): void {
    console.log(this.message)
    console.log( "Welcome: "+ this.route.snapshot.params['name'])
    this.name = this.route.snapshot.params['name']
  }

  getWelcomeMessage () {
    //console.log("Here is ur customized welcome message")
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );

    console.log("last line >> getWelcomeMessage");
  }

  handleSuccessfulResponse(response: HelloWorldBean) {
    console.log(" inside handleSuccessfulResponse");
    console.log(response);
    //console.log(response.message);
    this.welcomeMsgFromService = response.message;
  }

  handleErrorResponse(error: any) {
    //console.log(error);
    //console.log( error.error);
    //console.log( error.error.message);
    this.welcomeMsgFromService = error.error.message;
  }

  //method to call backed path variable service
  getWelcomeMessageWithParam () {
    this.service.executeHelloWorldBeanServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );

    console.log("last line >> getWelcomeMessageWithParam");
  }

}
