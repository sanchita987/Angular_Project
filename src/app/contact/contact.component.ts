import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';

/*export function forbiddenNameValidator(forbiddenName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = control.value === forbiddenName;
    return forbidden ? { 'forbiddenName': { value: control.value } } : null;
  };
}*/

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm = this.formBuilder.group({
    firstname: new FormControl('', [Validators.required] ),
    lastname: new FormControl('', [Validators.required] ),
    email: ['', [Validators.required , Validators.email]],
    mobile: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required), 
  });
  get firstname() {
    return this.contactForm.get('firstname')
  }
  get lastname() {
    return this.contactForm.get('lastname')
  }
  get email() {
    return this.contactForm.get('email')
  }
  get phone() {
    return this.contactForm.get('phone')
  }
  get mobile() {
    return this.contactForm.get('mobile')
  }
  get title() {
    return this.contactForm.get('title')
  }

  constructor(private formBuilder: FormBuilder) {}
  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('First Name:', this.contactForm.get('firstname')?.value);
      console.log('Last Name:', this.contactForm.get('lastname')?.value);
      console.log('Email:', this.contactForm.get('email')?.value);
      console.log('Mobile:', this.contactForm.get('mobile')?.value);
      console.log('Phone:', this.contactForm.get('phone')?.value);
      console.log('Title:', this.contactForm.get('title')?.value);
    } else {
      console.log('Form is not valid. Please check the input values.');
    }
  }
  
  
}
 