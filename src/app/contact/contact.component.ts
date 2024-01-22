import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(forbiddenName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = control.value === forbiddenName;
    return forbidden ? { 'forbiddenName': { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required, Validators.minLength(4),forbiddenNameValidator('sanchita')] ),
    email: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    mobile_number: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required), 
    aliases: this.formBuilder.array([this.formBuilder.control('')]),
  });

  get aliases() {
    return this.contactForm.get('aliases') as FormArray;
  }
  
  get name() {
    return this.contactForm.get('name')
  }
  get address() {
    return this.contactForm.get('address')
  }
  get email() {
    return this.contactForm.get('email')
  }
  get mobile_number() {
    return this.contactForm.get('mobile_number')
  }
  get message() {
    return this.contactForm.get('message')
  }
  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }
  onSubmit() {
    console.log(this.contactForm.value);
  }
  constructor(private formBuilder: FormBuilder) {}

  
}
