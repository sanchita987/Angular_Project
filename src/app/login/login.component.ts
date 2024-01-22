import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login-service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginResponse: any = null;
  constructor(private loginService: LoginService) {}


  onSubmit(): void {
    this.loginService.login(this.username, this.password)
      .subscribe(
        (response) => {
          // Handle successful login response
          this.loginResponse = response;
          console.log('Login successful:', response);
        },
        (error) => {
          // Handle login error
          console.error('Login error:', error);
          this.loginResponse = null;
        }
      );
  }
  

}

        