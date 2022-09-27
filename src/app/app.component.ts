import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from './service/main-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router,public main:MainServiceService) { }
  title = 'Kishore_Task';
  LoginEmp(){
    if(localStorage.getItem("LoginEmployee")===null)
      return false
    return true
  }
}
