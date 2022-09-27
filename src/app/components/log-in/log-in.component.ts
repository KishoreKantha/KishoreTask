import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/service/main-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private router: Router) { }
  Username: string = ""
  Password: string = ""
  ngOnInit() {
    this.Username = ""
    this.Password = ""
    localStorage.removeItem("LoginEmployee")
  }
  Login() {
    if (this.Username.trim() == "" || this.Password.trim() == "") {
      alert("Please Enter Username & Password")
      return false;
    }
    if (localStorage.getItem("EmployeeList") === null) {
      alert("Please Register Your Account")
      this.router.navigateByUrl("/register")
      return false;
    }
    var emp = JSON.parse(localStorage.getItem("EmployeeList") || "")
    var lgEmp=emp.filter((x: { Username: string; Password: string }) => x.Username == this.Username && x.Password == this.Password);
    if (lgEmp.length==0) {
      alert("Username or Password Incorrect")
      return false;
    }else{
      alert("Login Success")
      localStorage.setItem("LoginEmployee",JSON.stringify( lgEmp[0]))
      this.router.navigateByUrl("/home")
     
    }
    return true;
  }

}
