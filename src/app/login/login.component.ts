import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginResponse: any = null;
  errorResponse: any = ''
  loginForm:any;
  hidePassword: boolean = true; // Initial state: password is hidden
  constructor(private loginService: LoginService, 
    private route: Router,
    private fb: FormBuilder) {
      this.loginForm = this.fb.group({
        email: ['sacheeta987@gmail.com', [Validators.required , Validators.email]],
        password: ['1111111111', [Validators.required, Validators.minLength(8) ]],

      })
    }


  onSubmit(): void {
    console.log(this.loginForm.value)
    if(!this.loginForm.valid){
      return ;
    }
    this.loginService.login(this.loginForm.value)
      .subscribe(
        (response) => {
          // Handle successful login response
          this.loginResponse = response;
          // console.log(this.)
          console.log('Login successful:', response);
          localStorage.setItem ('access_token', response.access_token)
          this.route.navigate(['admin/dashboard'])
        },
        (error) => {
          console.log(error,"error")
          // Handle login error
          this.errorResponse = error.error.error
          console.error('Login error:', error);
          this.loginResponse = null;
        }
      );
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;

}
}

        