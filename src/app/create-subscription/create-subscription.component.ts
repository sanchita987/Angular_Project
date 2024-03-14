import { Component,OnInit } from '@angular/core';
import {  Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup , FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SubscriptionService } from '../subscription.service';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-subscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatAutocompleteModule, RouterModule],
  templateUrl: './create-subscription.component.html',
  styleUrl: './create-subscription.component.css'
})
export class createSubscriptionComponent implements OnInit  { 
  hasPlansForSelectedProduct: boolean = false;
  relationships: any = [];
  plans: any[] = [];
  products: any = [];
  customers: any = [];
  filteredCustomers: any = [];
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
    this.loadRelationships();
    this.loadProduct();
  }

  initForm() {
    this.subscriptionForm = this.fb.group({
      customer_name: ['', Validators.required],
      subscriber_relation: ['', Validators.required],
      subscriber_name: ['', [Validators.required, Validators.minLength(4)]],
      product_id: [''],
      price:[''],
      unit:[''],
      plan: [''],
      amount: [''],
      description: [''],
      plan_number: ['', [Validators.required]],
      invoice_creation_day: [''],
      billing_cycle: [''],
      start_date: [''],
      interval: [''],
      unit_price: [''],
      coupons: [''],
      plan_id:[''],
      invoice_now: [false],
      has_setup_fee: ['']
    });
  

    this.numbersArray = Array.from({ length: 29 }, (_, i) => i + 1);
  }
  loadRelationships() {
    this.data.getSubscriberRelationship().subscribe((response: any) => {
      this.relationships = response.data;
    });
  }
  loadProduct() {
    let allProducts: any[] = []; 
  
    const fetchPageData = (page: number) => {
      this.data.getProduct(page).subscribe((response: any) => {
        const items = response['data']['items'];
        allProducts = allProducts.concat(items);
        if (response['data']['page'] < response['data']['total_pages']) {
          fetchPageData(page + 1);
        } else {
          console.log(allProducts, 'All products loaded');
          this.products = allProducts;
        }
      });
    };
    fetchPageData(1);
  }
  
  
  onProductSelect(event: any): void {
    const selectedProductId = event.target.value;
  
    this.data.getProductDetails(selectedProductId).subscribe((response: any) => {
      console.log('Selected Product Details:', response.data);
      const filteredPlans = response.data.plans.filter((plan: any) => plan.status === true);
      const hasPlans = filteredPlans.length > 0;
      
      console.log('Plans:', hasPlans);
      this.hasPlansForSelectedProduct = hasPlans;
  
      if (hasPlans) {
        this.plans = filteredPlans;
        console.log('Filtered Plans:', this.plans);
      }
    });
  }
  
  loadCustomers() {
    const customerName = '';
    let allCustomers: any[] = [];
  
    const fetchPageData = (page: number) => {
      this.data.getCusto(customerName, page).subscribe((response: any) => {
        const items = response['data']['items'];
        allCustomers = allCustomers.concat(items);
        this.customers = allCustomers;
        this.filteredCustomers = this.customers;
        if (response['data']['page'] < response['data']['total_pages']) {
          fetchPageData(page + 1);
        }
      });
    };
    fetchPageData(1);
  }
  
  
  
  filterCustomers(event: any) {
    const inputValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (inputValue === '') {
      this.filteredCustomers = this.customers;
    } else {
      this.filteredCustomers = this.customers.filter((customer: any) => 
        customer.first_name.toLowerCase().includes(inputValue)
      );
    }
  }
  updateSubscriberName(event: MatAutocompleteSelectedEvent): void {
    const page = 1;
    const selectedCustomerName = event.option.value;
    if (selectedCustomerName) {
      this.subscriptionService.getCusto(selectedCustomerName, page).subscribe({
        next: (customer) => {
          this.subscriptionForm.patchValue({
            subscriber_name: selectedCustomerName,
            subscriber_relation: 'self'
          });
        },
        error: (error) => {
          console.error('Error fetching customer data:', error);
        }
      });
    }
  }

  onPlanSelected(plan: any): void {
    this.subscriptionForm.patchValue({
      price: plan.price,
      interval: plan.interval,
      description: plan.description,
      amount : plan.price 
    });
  }  


  onSubscriptionRegister(): void {
    const subscriptionData = this.subscriptionForm.value;
    this.subscriptionService.registerSubscription(subscriptionData)
      .subscribe({
        next: (response: any) => {
          console.log('Subscription Register successful:', response);
        },
        error: (error: any) => {
          console.error('Error occurred during subscription registration:', error);
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




