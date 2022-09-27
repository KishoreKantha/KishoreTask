import { Injectable } from '@angular/core';
import { LogInComponent } from '../components/log-in/log-in.component';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  constructor() { }
 
  clear() {
    localStorage.removeItem("LoginEmployee")
    
  }
}
