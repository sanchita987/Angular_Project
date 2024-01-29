import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DashboardServiceService } from '../dashboard-service.service';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { RegistrationServiceService } from '../registration-service.service';
import { routes } from '../app.routes';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  

  registerForm:any
  registerResponse: any = null;
  errorResponse: any = ''
  constructor(private  registrationserviceservice: RegistrationServiceService, 
   // private route: Router,
    private fb: FormBuilder) {
      this.registerForm = this.fb.group({
        email: ['', [Validators.required , Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8) ]],
        name:['', [Validators.required, Validators.minLength(4) ]],
        company:['',[Validators.required]],
        address:['', [Validators.required ]],
        user_type:['', [Validators.required ]],
        is_active:['',],
        phone:['', [Validators.required, Validators.minLength(10), Validators.pattern(/^977/)]],
      });
    }
  

  onregister(): void {
    console.log(this.registerForm.value)
    if(!this.registerForm.valid){
      return ;
    }
    
    // console.log(this.email, this.password, this.name, this.company, this.user_type, this.phone, this.address, this.is_active)
    this.registrationserviceservice.register(this.registerForm.value)
      .subscribe(
        (response) => {
          // Handle successful register response
          this.registerResponse = response;
          // console.log(this.)
          console.log('Register successful:', response);
          //localStorage.setItem ('access_token', response.access_token)
         // this.route.navigate(['dashboard'])
        },
        (error) => {

          this.errorResponse = "Error"
 
          this.registerResponse = Response;
        }
      );
  }
  get name() {
    return this.registerForm.get('name')
  }
  get company() {
    return this.registerForm.get('company')
  }
  get email() {
    return this.registerForm.get('email')
  }
  get phone() {
    return this.registerForm.get('phone')
  }
  get is_active() {
    return this.registerForm.get('company')
  }
  get user_type() {
    return this.registerForm.get('company')
  }
  get password() {
    return this.registerForm.get('password')
  }
  get address() {
    return this.registerForm.get('address')
  }
  

}
/*export class RegistrationComponent {registerForm = this.formBuilder.group({
  name: new FormControl('', Validators.required, ),
  email: new FormControl('', Validators.required),
  address: new FormControl('', Validators.required),
  phone: new FormControl('', Validators.required),
});

get name() {
  return this.registerForm.get('name')
}
get address() {
  return this.registerForm.get('address')
}
get email() {
  return this.registerForm.get('email')
}
get phone() {
  return this.registerForm.get('phone')
}
onSubmit() {
  console.log(this.registerForm.value);
}
constructor(private formBuilder: FormBuilder) {}



}*/


 


