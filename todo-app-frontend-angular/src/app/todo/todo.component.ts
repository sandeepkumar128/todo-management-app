import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number = 0;
  todo!: Todo;
  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date());
    if (this.id != -1) {
      this.todoService.retrieveTodo('sandeepx', this.id).subscribe(
        todoData => {
          this.todo = todoData;
          console.log(todoData);
        }
      );
    }
  }

  saveTodo() {
    if (this.id == -1) {
      // ==== -> to compare objects, == -> to compare primitives
      console.log('saveTodo >> -1')
      this.todoService.createTodo('sandeepx', this.todo).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['todos']);
        }
      )
    } else {
      this.todoService.updateTodo('sandeepx', this.id, this.todo).subscribe(
        data => {
          console.log("updateTodo >>");
          console.log(data);
          this.router.navigate(['todos']);
        }
      )
    }
  }

}
