import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/bo/employee.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router) { }
  passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  Employee: Employee = new Employee()

  Roles: any = ['Admin', 'Employee', 'Intern'];
  ngOnInit() {
    this.Employee = new Employee()
  }
  Register() {
    if (localStorage.getItem("EmployeeList") === null) {
      var emp1: Employee[] = []
      localStorage.setItem("EmployeeList", JSON.stringify(emp1))
    }
    var emp = JSON.parse(localStorage.getItem("EmployeeList") || "")
    if (emp.filter((x: { Username: string; }) => x.Username.toLowerCase().trim() == this.Employee.Username.toLowerCase().trim()).length > 0) {
      alert("Username Exists")
      return false;
    }
    if(this.Employee.Username.trim().length<2){
      alert("Invalid Username")
      return false;
    }
    if (!this.emailPattern.test(this.Employee.Email)) {
      alert("Invalid Email")
      return false;
    }
    if (emp.filter((x: { Email: string; }) => x.Email.toLowerCase().trim() == this.Employee.Email.toLowerCase().trim()).length > 0) {
      alert("Email Exists")
      return false;
    }
    if (!this.passwordPattern.test(this.Employee.Password)) {
      alert("Password must contain eight characters, at least one letter and one number")
      return false;
    }
    if(this.Employee.Role==""){
      alert("Please Choose Your Role")
      return false;
    }
    this.Employee.Id = emp.length.toString()
    emp.push(this.Employee);
    localStorage.setItem("EmployeeList", JSON.stringify(emp))
    alert("Success")
    this.Employee=new Employee()
    this.router.navigateByUrl("/login")
    return true;
  }
}
