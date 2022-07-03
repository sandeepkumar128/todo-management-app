package com.todoapp.rest.webservices.restfulwebservices.helloworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

//Controller
//@CrossOrigin(origins="http://localhost:4200")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class HelloWorldController {
	
	@GetMapping(path = "/hello-world")
	public String helloWorld () {
		return "Hello world guys!!";
	}
	
	@GetMapping(path = "/hello-world-bean")
	public HelloWorldBean helloWorldBean () {
		//return new HelloWorldBean("Hello world bean! -> SanY");
		throw new RuntimeException("Some runtime exception occurred - contact xyz@gmail.com");
	}
	
	@GetMapping(path = "/hello-world-bean/path-variable/{name}")
	public HelloWorldBean helloWorldPathVariable(@PathVariable String name) {
		return new HelloWorldBean("Welcome to this cool todo app >> " + name);
	}
	
}
