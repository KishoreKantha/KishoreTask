import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/bo/task.model';
import { MainServiceService } from 'src/app/service/main-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }
  tasks: Task[] = [];
  pending: Task[] = [];
  done: Task[] = [];
  task: Task = new Task()
  addTask: boolean = false
  updateTask: boolean = false
  pipe = new DatePipe('en-US');
  ngOnInit() {
    if(localStorage.getItem("LoginEmployee") === null){
      this.router.navigateByUrl("/login")
      return
    }
    
    this.tasks = [];
    this.pending = [];
    this.done = [];
    this.task = new Task();
    this.addTask = false;
    this.updateTask = false;
    this.GetData()
  }
  GetData() {
    if (localStorage.getItem("TaskList") != null) {
      this.tasks = JSON.parse(localStorage.getItem("TaskList") || "")
    }
    if (localStorage.getItem("P_TaskList") != null) {
      this.pending = JSON.parse(localStorage.getItem("P_TaskList") || "")
    }
    if (localStorage.getItem("D_TaskList") != null) {
      this.done = JSON.parse(localStorage.getItem("D_TaskList") || "")
    }
    this.task=new Task()
  }
  AddTask() {
    if (this.task.Title.trim() == "" || this.task.Discription.trim() == "") {
      alert("Please Enter Titel && Discription")
      return;
    }
    if (localStorage.getItem("TaskList") === null) {
      var task: Task[] = []
      localStorage.setItem("TaskList", JSON.stringify(task))
    }
    var todo = JSON.parse(localStorage.getItem("TaskList") || "")
    this.task.Status = "Created";
    this.task.Id = (this.pipe.transform(new Date(), 'ddMMYYYYhhmmss')) as any;
    todo.push(this.task);
    localStorage.setItem("TaskList", JSON.stringify(todo));
    this.task = new Task()
    this.GetData()
    this.addTask = false;
    this.updateTask = false;
  }
  acceptTask(id: string) {
    var emp=JSON.parse(localStorage.getItem("LoginEmployee") as any);
    this.tasks.filter(x => x.Id == id)[0].Worker = emp.Username;
    this.tasks.filter(x => x.Id == id)[0].Status="Pending";
    localStorage.setItem("TaskList", JSON.stringify(this.tasks.filter(x => x.Id != id)));
    this.pending.push(this.tasks.filter(x => x.Id == id)[0])
    localStorage.setItem("P_TaskList",JSON.stringify(this.pending))
    this.GetData()
  } 
  UpdateTask() {
    if (this.task.Title.trim() == "" || this.task.Discription.trim() == "") {
      alert("Please Enter Titel && Discription")
      return;
    }
    if (localStorage.getItem("TaskList") === null) {
      var task: Task[] = []
      localStorage.setItem("TaskList", JSON.stringify(task))
    }
    if(this.task.Status=="Created"){
      localStorage.setItem( "TaskList", JSON.stringify(this.tasks))
    }
    else{
      localStorage.setItem( "P_TaskList", JSON.stringify(this.pending))
    }
    this.task=new Task();
    this.addTask=false;
    this.updateTask=false
  }
  DeleteToDo(id:string){
    localStorage.setItem("TaskList", JSON.stringify(this.tasks.filter(x => x.Id != id)));
    this.GetData()
  }
  DeletePending(id:string){
    localStorage.setItem("P_TaskList", JSON.stringify(this.pending.filter(x => x.Id != id)));
    this.GetData()
  }
  DeleteDone(id:string){
    localStorage.setItem("D_TaskList", JSON.stringify(this.done.filter(x => x.Id != id)));
    this.GetData()
  }
  CompleteTask(id:string){
    localStorage.setItem("P_TaskList",JSON.stringify(this.pending.filter(x=>x.Id!=id)))
    var ctask=this.pending.filter(x=>x.Id==id);
    if(ctask.length>0){
      this.done.push(ctask[0])
      localStorage.setItem("D_TaskList",JSON.stringify(this.done))
    }
    this.GetData()
  }

}
