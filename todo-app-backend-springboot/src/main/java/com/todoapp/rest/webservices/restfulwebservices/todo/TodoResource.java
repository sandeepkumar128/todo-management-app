package com.todoapp.rest.webservices.restfulwebservices.todo;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class TodoResource {
	
	@Autowired
	private TodoHardcodedService todoService;
	
	//GET /users/{username}/todos
	@GetMapping("/users/{username}/todos")
	private List<Todo> getAllTodos(@PathVariable String username) {
		return todoService.findAll();
	}
	
	//GET /users/{username}/todos
		@GetMapping("/users/{username}/todos/{id}")
		private Todo getTodo(@PathVariable String username, @PathVariable long id) {
			return todoService.findById(id);
		}
	
	//DELETE users/{username}/todos/{id}
		// delete a todo
	@DeleteMapping("/users/{username}/todos/{id}")
	private ResponseEntity<Void> DeleteTodo(@PathVariable String username, @PathVariable long id) {
		Todo todo = todoService.deleteById(id);
		 if (todo!=null) {
			 return ResponseEntity.noContent().build();
		 }
		return ResponseEntity.notFound().build();
	}
	
	//PUT /users/{username}/todos/{id}
	// Update a todo
	@PutMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable long id, @RequestBody Todo todo) {
		Todo updateTodo = todoService.save(todo);
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);
		
	}
	
	//POST /users/{username}/todos/
	// create a new todo
		@PostMapping("/users/{username}/todos")
		public ResponseEntity<Void> createTodo(@PathVariable String username, @RequestBody Todo todo) {
			Todo createTodo = todoService.save(todo);
			
			//location: get current resource url
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createTodo.getId()).toUri();
			return ResponseEntity.created(uri).build();
			
		}

	
}
