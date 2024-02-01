import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { routes } from '../app.routes';

@Component({
  selector: 'app-customer-update',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.css'
})
export class CustomerUpdateComponent {
  customer: any = {
    data: []
  };
  selectedFile: File | null = null;
  customer_registerForm: FormGroup;
  customer_registerResponse: any = null;
  errorResponse: any = '';
  customer_id: any;



  constructor(private data: CustomerService, private route: ActivatedRoute,
    private customerservice: CustomerService,
    private router: Router,
    private fb: FormBuilder) {
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
      residence_card_front: [''],
      residence_card_back: [''],
      company_doc: [''],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.customer_id = data['id']
      this.data.getCustomer(data['id']).subscribe((response: any) => {
        console.log(response, "response");

        this.customer_registerForm.patchValue(response['data']);
        this.customer = response['data'];
      });
    });
  }
  //id: number = 0;

  onupdate(): void {
    console.log(this.customer_registerForm.value);
    if (!this.customer_registerForm.valid) {
      return;
    }

    this.updateCustomer();
    // this.updateCustomer(customerId, this.customer_registerForm.value);
  }

  updateCustomer(): void {
    this.customerservice.updateCustomer(this.customer_id, this.customer_registerForm.value).subscribe(
      (response) => {
        console.log('Customer updated successfully', response);
        this.customer_registerResponse = response;
        this.router.navigate(['admin/customer']);
      },
      (error) => {
        console.error('Error updating customer', error);
        this.errorResponse = 'Error';
      }
    );
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
