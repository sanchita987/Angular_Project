import { Component } from '@angular/core';
import { PaymentService } from '../payment.service';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-payment',
  standalone: true,
  imports: [MatAutocompleteModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-payment.component.html',
  styleUrl: './create-payment.component.css'
})

export class CreatePaymentComponent {
  paymentForm: FormGroup = new FormGroup({});
  invoice: any;
  payments: any = [];
  customers: any = [];
  filteredCustomers: any = [];
  invoices: any[] = [];
  optionSelected: boolean = false;
  hasInvoices: boolean = false;
  amountReceived: number | undefined;
  isCheckboxChange: boolean = false;
  constructor(
    private data: PaymentService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadCustomers();
    this.loadPaymentmode();
    this.paymentForm.get('amount')?.valueChanges.subscribe(value => {
      const amountReceived = value || 0;
      this.updateNewAmounts(amountReceived);
    });
  }

  initForm() {
    const formControls: { [key: string]: any } = {
      customer_name: ['', Validators.required],
      payment_mode: [''],
      amount: [''],
      paymentdate: [''],
      reference: [''],
      description: [''],
      new_amount0: [''],
      new_amount1: [''],
      new_amount2: [''],
      amount_received: [false]
    };
    this.paymentForm = this.fb.group(formControls);
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
  updateInfo(event: MatAutocompleteSelectedEvent): void {
    this.optionSelected = true;
    const selectedCustomerName = event.option.value;
    const selectedCustomer = this.filteredCustomers.find((customer: any) => customer.first_name === selectedCustomerName);

    if (selectedCustomer) {
      this.amountReceived = selectedCustomer.total_due_amount;
      this.paymentForm.patchValue({
        amount: null,
        amount_received: false
      });
      this.data.getInvoiceByCustomerId(selectedCustomer.id).subscribe((response: any) => {
        this.invoices = response['data'].items;
        console.log('invoices', this.invoices);
        if (this.invoices.length > 0) {
          this.hasInvoices = true;
        } else {
          this.hasInvoices = false;
        }
      });
    }
  }

  totalDueAmount: number = 0;

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const amountControl = this.paymentForm.get('amount');

    if (checkbox.checked && this.invoices.length > 0) {
      amountControl?.patchValue(this.amountReceived);
      this.isCheckboxChange = true;
      this.patchNewAmount();
      this.calculateTotalDueAmount();
    } else {
      amountControl?.patchValue('');
      this.clearNewAmount();
      this.totalDueAmount = 0;
    }
  }

  patchNewAmount(): void {
    this.clearNewAmount();
    this.totalDueAmount = 0;
    this.invoices.forEach((invoice, index) => {
      const dueAmount = invoice.due_amount || 0;
      this.totalDueAmount += dueAmount;
      const controlName = 'new_amount' + index;
      console.log('Adding control:', controlName, 'with value:', dueAmount);
      this.paymentForm.addControl(controlName, this.fb.control(dueAmount));
      this.paymentForm.get(controlName)?.patchValue(dueAmount);
    });
  }

  calculateTotalDueAmount(): void {
    this.totalDueAmount = 0;
    this.invoices.forEach((invoice) => {
      const dueAmount = invoice.due_amount || 0;
      this.totalDueAmount += dueAmount;
    });

  }

  clearNewAmount(): void {
    for (const controlName of Object.keys(this.paymentForm.controls)) {
      if (controlName.startsWith('new_amount')) {
        this.paymentForm.removeControl(controlName);
      }
    }
  }
  calculateAmountInExcess(): number {
    const amountReceived = this.paymentForm.get('amount')?.value || 0;
    return amountReceived - this.totalDueAmount;
  }
  updateNewAmounts(amountReceived: number): number {
    let totalDueAmount = 0;
    let remainingAmount = amountReceived;
    this.invoices.forEach((invoice, index) => {
      const dueAmount = invoice.due_amount || 0;
      const controlName = 'new_amount' + index;

      if (remainingAmount >= dueAmount) {
        this.paymentForm.get(controlName)?.patchValue(dueAmount);
        remainingAmount -= dueAmount;
        totalDueAmount += dueAmount;
      } else {
        this.paymentForm.get(controlName)?.patchValue(remainingAmount);
        totalDueAmount += remainingAmount;
        remainingAmount = 0;
      }
    });

    this.totalDueAmount = totalDueAmount;
    return totalDueAmount;
  }



  loadPaymentmode() {
    this.data.getPaymentmode().subscribe((response: any) => {
      this.payments = response.data;
    });
  }

  get customer_name() {
    return this.paymentForm.get('customer_name');
  }
  get payment_mode() {
    return this.paymentForm.get('payment_mode');
  }
  get amount() {
    return this.paymentForm.get('amount');
  }
  get amount_received() {
    return this.paymentForm.get('amount_received');
  }
  get new_amount() {
    return this.paymentForm.get('new_amount');
  }

}


