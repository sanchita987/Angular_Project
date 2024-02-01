import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {
  user: any = {
    data: []
  };
  registerForm: any
  registerResponse: any = null;
  errorResponse: any = ''
  user_id: any;
  constructor(private data: UserService,private userserviceservice: UserService,private route: ActivatedRoute,
    private router: Router,
    // private route: Router,
    private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      company: ['', [Validators.required]],
      address: ['', [Validators.required]],
      user_type: ['', [Validators.required]],
      is_active: ['',],
      phone: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.user_id = data['id']
      this.data.getusers(data['id']).subscribe((response: any) => {
        console.log(response, "response");
        
        this.registerForm.patchValue(response['data']);
        this.user = response['data'];
      });
    });
  }
  id: number =  0;

  onUpdate(): void {
    console.log(this.registerForm.value);
    if (!this.registerForm.valid) {
      return;
    }
  
    this.updateUser(); 
  }
  
  updateUser(): void {
    this.userserviceservice.updateUser(this.user_id, this.registerForm.value).subscribe(
      (response) => {
        console.log('User updated successfully', response);
        this.registerResponse = response;
        this.router.navigate(['admin/user']);
      },
      (error) => {
        console.error('Error updating user', error);
        this.errorResponse = 'Error';
      }
    );
  }
  
   /* this.userserviceservice.register(this.registerForm.value)
      .subscribe(
        (response) => {

          this.registerResponse = response;

          console.log('Register successful:', response);

        },
        (error) => {

          this.errorResponse = "Error"

          this.registerResponse = Response;
        }
      );*/
  
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
