import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';

export class Todo {
  //creating this Todo class for better structured approach
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date ){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  // todos = {id: 1,
  //         description: 'Learn to dance San!'}

  // todos = {id: 1,
  //         description: 'Learn to dance San!'}
  todos: Todo[] = [];
  message: string = '';

    // new Todo(1, 'Learn to sing', false, new Date()),
    // new Todo(2, 'Learn to drive', false, new Date()),
    // new Todo(3, 'Learn to swim', false, new Date()),
    // {id:1, description:'Learn to sing'},
    // {id:2, description:'Learn to dance'},
    // {id:3, description:'Learn to swim'},
    // {id:4, description:'Learn to ride a bike'}

  //]
  constructor(
    private todoService: TodoDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refreshTodos();
    }

    refreshTodos () {
      this.todoService.retrieveAllTodos('sandeepx').subscribe(
        response => { console.log (response);
        this.todos = response;
        }
        )
    }

    deleteTodo (id:any) {
      console.log ('delete todo >>' + id)
      this.todoService.deleteTodo('sandeepx', id).subscribe(
        response => {
          console.log(response);
          this.message = `Deletion of Todo ${id} successful!!`;
          this.refreshTodos();
        }
      );
    }

    updateTodo (id: any) {
      console.log (`update >>  ${id}`)
      this.router.navigate(['todo', id])
    }

    addTodo() {
      console.log("add todo!");
      //let's assume id =-1 when we are creating a new todo
      this.router.navigate(['todo', -1]);
    }

}
