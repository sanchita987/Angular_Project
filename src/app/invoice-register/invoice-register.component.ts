import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { FormGroup } from '@angular/forms';
import { InvoiceServiceService } from '../invoice-service.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-invoice-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './invoice-register.component.html',
  styleUrl: './invoice-register.component.css'
})
export class InvoiceRegisterComponent {
  registerForm: any
  registerResponse: any = ''
  errorResponse: any = ''
  constructor(private invoiceserviceservice: InvoiceServiceService,
    private route: Router,
    private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      url: ['', [Validators.required, ]],
      number: ['', [Validators.required, ]],
      subscription_id: ['', [Validators.required, ]],
      comments: ['',[Validators.required, ] ],
      status: ['',[Validators.required, ] ],
      invoice_date: ['',[Validators.required, ] ],
      invoice_due_date: ['',[Validators.required, ]],
      total: ['', [Validators.required, ]],
      due_amount: ['', [Validators.required, ]],
    });
  }
  onregister(): void {
    console.log('Request Payload:', this.registerForm.value);

    console.log(this.registerForm.value)
    if (!this.registerForm.valid) {
      return;
    }

    this.invoiceserviceservice.register(this.registerForm.value)
      .subscribe(
        (response: any) => {
          this.registerResponse = response;
          console.log('Customer Register successful:', response);
         // this.route.navigate(['admin/customer']);
        },
        (error) => {
          this.errorResponse = 'Error';
        }
      );
  }

  get url() {
    return this.registerForm.get('url')
  }
  get number () {
    return this.registerForm.get('number')
  }
  get subscription_id () {
    return this.registerForm.get('subscription_id')
  }
  get comments () {
    return this.registerForm.get('comments')
  }
  get status () {
    return this.registerForm.get('status')
  }
  get invoice_date() {
    return this.registerForm.get('invoice_date')
  }
  get invoice_due_date() {
    return this.registerForm.get('invoice_due_date')
  }
  get total() {
    return this.registerForm.get('total')
  }
  get due_amount() {
    return this.registerForm.get('due_amount')
  }

}
