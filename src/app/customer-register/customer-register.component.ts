import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css'],
})
export class CustomerRegisterComponent {
  selectedFile: File | null = null;
  customer_registerForm: any;
  customer_registerResponse: any = null;
  errorResponse: any = '';

  constructor(
    private customerservice: CustomerService,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.customer_registerForm = this.fb.group({
      customer_type: [null, [Validators.required, Validators.min(0), Validators.max(1), Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required, Validators.minLength(4)]],
      last_name: ['', [Validators.required, Validators.minLength(4)]],
      mailing_address: [''],
      deposit: [''],
      zipcode: [''],
      phone: [''],
      details: [''],
      province: [''],
      city: [''],
      address: [''],
      building: [''],
      gender: [''],
      dob: [''],
      company: [''],
      whatsapp: [''],
      facebook: [''],
      profession: [''],
      date: [''],
      nationality: [''],
      residence_card_number: [''],
      residence_card_status: [''],
      smartpit_no: [''],
      bankautoid_telecom: [''],
      bankauto_veritrans: [''],
      referer: [''],
      contacts: [''],
      description: [''],
      period_of_stay: [''],
      residence_card_front: [''], // Add this line for the file input
      residence_card_back: [''],
      company_doc: [''],
    });
  }

  onregister(): void {
    console.log(this.customer_registerForm.value);
    if (!this.customer_registerForm.valid) {
      return;
    }

    // If a file is selected, append it to the form data
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('residence_card_front', this.selectedFile);

      // Set the form control value
      this.customer_registerForm.patchValue({
        residence_card_front: formData,
      });
    }

    this.customerservice.register(this.customer_registerForm.value).subscribe(
      (response) => {
        this.customer_registerResponse = response;
        console.log('Customer Register successful:', response);
        this.route.navigate(['admin/customer']);
      },
      (error) => {
        this.errorResponse = 'Error';
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      // Store the selected file
      this.selectedFile = file;

      // Display image preview
      this.showPreview(file);
    }
  }

  showPreview(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.selectedFile = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  get email() {
    return this.customer_registerForm.get('email');
  }
  get first_name() {
    return this.customer_registerForm.get('first_name');
  }
  get last_name() {
    return this.customer_registerForm.get('last_name');
  }
  get customer_type() {
    return this.customer_registerForm.get('customer_type');
  }
  get mailing_address() {
    return this.customer_registerForm.get('mailing_address');
  }
  get deposit() {
    return this.customer_registerForm.get('deposit');
  }
  get zipcode() {
    return this.customer_registerForm.get('zipcode');
  }
  get details() {
    return this.customer_registerForm.get('details');
  }
  get phone() {
    return this.customer_registerForm.get('phone');
  }
  get province() {
    return this.customer_registerForm.get('province');
  }
  get city() {
    return this.customer_registerForm.get('city');
  }
  get address() {
    return this.customer_registerForm.get('address');
  }
  get building() {
    return this.customer_registerForm.get('building');
  }
  get gender() {
    return this.customer_registerForm.get('gender');
  }
  get dob() {
    return this.customer_registerForm.get('dob');
  }
  get company() {
    return this.customer_registerForm.get('company');
  }
  get whatsapp() {
    return this.customer_registerForm.get('whatsapp');
  }
  get facebook() {
    return this.customer_registerForm.get('facebook');
  }
  get profession() {
    return this.customer_registerForm.get('profession');
  }
  get date() {
    return this.customer_registerForm.get('date');
  }
  get nationality() {
    return this.customer_registerForm.get('nationality');
  }
  get residence_card_number() {
    return this.customer_registerForm.get('residence_card_number');
  }
  get residence_card_status() {
    return this.customer_registerForm.get('residence_card_status');
  }
  get company_doc() {
    return this.customer_registerForm.get('company_doc');
  }
  get smartpit_no() {
    return this.customer_registerForm.get('smartpit_no');
  }
  get bankautoid_telecom() {
    return this.customer_registerForm.get('bankautoid_telecom');
  }
  get bankauto_veritrans() {
    return this.customer_registerForm.get('bankauto_veritrans');
  }
  get referer() {
    return this.customer_registerForm.get('referer');
  }
  get contacts() {
    return this.customer_registerForm.get('contacts');
  }
  get description() {
    return this.customer_registerForm.get('description');
  }
  get period_of_stay() {
    return this.customer_registerForm.get('period_of_stay');
  }
 
}



