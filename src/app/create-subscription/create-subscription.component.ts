import { Component,OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup , FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SubscriptionService } from '../subscription.service';

@Component({
  selector: 'app-create-subscription',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-subscription.component.html',
  styleUrl: './create-subscription.component.css'
})
export class createSubscriptionComponent implements OnInit  { 
  customers: any = [];
  subscriptionForm: FormGroup = new FormGroup({}); 
  numbersArray: number[] = []; 
  constructor(
    private data: SubscriptionService,
    private router: Router,
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadCustomers();
  }

  initForm() {
    this.subscriptionForm = this.fb.group({
      customer_name: ['', Validators.required],
      subscriber_relation: ['', Validators.required],
      subscriber_name: ['', [Validators.required, Validators.minLength(4)]],
      product_id: [''],
      plan_number: ['', [Validators.required]],
      invoice_creation_day: [''],
      billing_cycle: [''],
      start_date: [''],
      coupons: [''],
      invoice_now: [false],
      has_setup_fee: ['']
    });
  

    this.numbersArray = Array.from({ length: 29 }, (_, i) => i + 1);
  }
  

  loadCustomers() {
    this.data.getCusto().subscribe((response: any) => {
      console.log(response['data'], 'response');
      this.customers = response['data']['items']; 
      console.log(this.customers);
    });
  }
  updateSubscriberName(event: any) {
    const selectedCustomerName = event.target.value;
    this.subscriptionForm.get('subscriber_name')?.setValue(selectedCustomerName);
  }

  onSubscriptionRegister(): void {
    const subscriptionData = this.subscriptionForm.value;
    this.subscriptionService.registerSubscription(subscriptionData)
      .subscribe({
        next: (response: any) => {
          console.log('Subscription Register successful:', response);
          // Handle success
        },
        error: (error: any) => {
          console.error('Error occurred during subscription registration:', error);
          // Handle error
        }
      });
  }
  get customer_name() {
    return this.subscriptionForm.get('customer_name');
  }
  get subscriber_name() {
    return this.subscriptionForm.get('subscriber_name');
  }
  get subscriber_relation() {
    return this.subscriptionForm.get('subscriber_relation');
  }
  get product_id() {
    return this.subscriptionForm.get('product_id');
  }
  get plan_number() {
    return this.subscriptionForm.get('plan_number');
  }
  get invoice_creation_day() {
    return this.subscriptionForm.get('invoice_creation_day');
  }
  get billing_cycle() {
    return this.subscriptionForm.get('billing_cycle');
  }
  get start_date() {
    return this.subscriptionForm.get('start_date');
  }
  get coupons() {
    return this.subscriptionForm.get('coupons');
  }
  get invoice_now() {
    return this.subscriptionForm.get('invoice_now');
  }
  get has_setup_fee() {
    return this.subscriptionForm.get('has_setup_fee');
  }
}




