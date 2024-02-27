import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { FormGroup, FormArray } from '@angular/forms';


@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent {
  dynamicForm: FormGroup;
  constructor(private fb: FormBuilder
  ) {
    this.dynamicForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      additionalFields: this.fb.array([])
  });
  }
  get username() {
    return this.dynamicForm.get('username');
  }
  get password() {
    return this.dynamicForm.get('password');
  }

  get additionalFields() {
    return this.dynamicForm.get('additionalFields') as FormArray;
  }


  addTextField() {
    this.additionalFields.push(this.fb.control('', [Validators.required]));
  }

  removeTextField(index: number) {
    this.additionalFields.removeAt(index);
  }
}
  

