package com.todoapp.rest.webservices.restfulwebservices.todo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TodoHardcodedService {
	
	private static List<Todo> todos = new ArrayList<Todo>();
	
	private static long idCounter = 0;
	
	static {
		todos.add(new Todo(++idCounter, "Sandeep", "Learn to sing>>", new Date(), false));
		todos.add(new Todo(++idCounter, "Sandeep", "Learn to dance>>", new Date(), false));
		todos.add(new Todo(++idCounter, "Sandeep", "Learn to ride bike>>", new Date(), false));
	}

	public List<Todo> findAll() {
		 return todos;
	}
	
	public Todo deleteById(long id) {
		Todo todo = findById(id);
		
		if (todo == null) return null;
		
		if (todos.remove(todo)) {
			return todo;
		}
		
		return null;
	}

	public Todo findById(long id) {
		
		for(Todo todo : todos) {
			if (todo.getId() == id) {
				return todo;
			}
		}
		
		return null;
	}
	
	public Todo save(Todo todo) {
		//save a new Todo
		if (todo.getId() == -1) {
			todo.setId(++idCounter);
			todos.add(todo);
		} else {
			//to update: first delete that todo & then add the same at that id
			deleteById(todo.getId());
			todos.add(todo);
		}
		
		return todo;
		
	}
}
