import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class HelloWorldBean {
  constructor(public message:string) {}
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http:HttpClient
  ) { }

  executeHelloWorldBeanService() {
    //console.log("Data from backend hello world bean service!");
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
  }

  executeHelloWorldBeanServiceWithPathVariable(name:string) {
    //let basicAuthHeaderString = this.createBasicAuthHttpHeader();

    // let headers = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // });
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': 'Basic ' + btoa('sandeep:dummy')
    //   })
    // };

    return this.http.get<HelloWorldBean>(
      `http://localhost:8080/hello-world-bean/path-variable/${name}`,
      //httpOptions
      );
  
  }

  // createBasicAuthHttpHeader () {
  //   let username = 'sandeep';
  //   let password = 'dummy';
  //   let basicAuthHeaderString = 'Basic' + window.btoa(username + ':' + password);
  //   return basicAuthHeaderString;
  // }


}
