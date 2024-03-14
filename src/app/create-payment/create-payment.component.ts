import { Component } from '@angular/core';
import { PaymentService } from '../payment.service';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-create-payment',
  standalone: true,
  imports: [MatAutocompleteModule, CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './create-payment.component.html',
  styleUrl: './create-payment.component.css'
})

export class CreatePaymentComponent {
  paymentForm: FormGroup = new FormGroup({});
  totalDueAmount: number = 0;
  payments: any = [];
  customers: any = [];
  filteredCustomers: any = [];
  invoice: any[] = [];
  checkboxChecked: boolean = false;
  optionSelected: boolean = false;
  hasInvoices: boolean = false;
  amountReceived: number | undefined;
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
      customer_id: ['', Validators.required],
      mode: [''],
      amount: [''],
      send_mail: [''],
      paid_at: [''],
      reference: [''],
      description: [''],
      apply_to_invoices: [''],
      amount_received: [false],
      invoices: this.fb.array([])
    };
    this.paymentForm = this.fb.group(formControls);
  }

  addInvoice(invoice: any) {
    const dueAmount = invoice.due_amount;
    const invoiceId = invoice.id;

    const validateAmount = (id: number) => {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const amount = control.value;
        if (amount > dueAmount) {
          return { 'amountExceedsDue': true };
        }
        return null;
      };
    };

    const invoiceForm = this.fb.group({
      id: [invoiceId],
      amount: [
        0,
        [Validators.required, validateAmount(invoiceId)]
      ],
      due_amount: [invoice.due_amount]
    });

    (this.paymentForm.get('invoices') as FormArray).push(invoiceForm);
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
        customer_id: selectedCustomer.id,
        amount: null,
        amount_received: false
      });
      this.data.getInvoiceByCustomerId(selectedCustomer.id).subscribe((response: any) => {
        this.invoice = response['data'].items;
        console.log('invoices', this.invoice);
        this.hasInvoices = this.invoice.length > 0;
        if (this.hasInvoices) {
          this.patchNewAmount();
        }
      });
    }
  }

  checkedBox($event: any) {
    this.invoices.controls.forEach((element: any) => {
      const dueAmount = element.get('due_amount').value;
      element.get('amount').setValue(dueAmount);
    });
    this.updateAmount();
  }

  updateAmount() {
    const checkboxChecked = true;
    const amountControl = this.paymentForm.get('amount');
    if (checkboxChecked) {
      const amountReceived = this.amountReceived ?? 0;
      amountControl?.patchValue(amountReceived);
    } else {
      amountControl?.patchValue('');
    }
  }
  patchNewAmount(): void {
    this.clearNewAmount();
    this.totalDueAmount = 0;
    const invoicesFormArray = this.paymentForm.get('invoices') as FormArray;
    this.invoice.forEach((invoice) => {
      const dueAmount = invoice.due_amount || 0;
      this.totalDueAmount += dueAmount;
      this.addInvoice(invoice);
      const invoiceFormGroup = invoicesFormArray.at(invoicesFormArray.length - 1) as FormGroup;
      console.log("due amount of the invoice", this.totalDueAmount)
    });
  }

  calculateTotalDueAmount(): void {
    this.totalDueAmount = 0;
    this.invoice.forEach((invoice) => {
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

    const invoiceControls = this.invoices.controls;
    const invoiceData = this.invoice;

    for (let index = 0; index < invoiceControls.length; index++) {
      const control = invoiceControls[index];
      const dueAmount = invoiceData[index].due_amount || 0;
      const controlName = `invoice.${index}.amount`;
      const patchValue = Math.min(remainingAmount, dueAmount);

      control.get(controlName)?.patchValue(patchValue);
      totalDueAmount += patchValue;
      remainingAmount -= patchValue;

      if (remainingAmount <= 0) break;
    }

    this.totalDueAmount = totalDueAmount;
    return totalDueAmount;
  }


  onSubmit(): void {
    const formData = this.paymentForm.value;
    this.data.savePayment(formData).subscribe({
      next: (response) => {
        console.log('Response from API:', response);
        this.paymentForm.reset();
        this.router.navigate(['admin/payment']);
      },
      error: (error) => {
        console.error('Error while posting data:', error);
      }
    });
  }

  loadPaymentmode() {
    this.data.getPaymentmode().subscribe((response: any) => {
      this.payments = response.data;
    });
  }


  getFormControl(controlName: string) {
    return this.paymentForm.get(controlName);
  }
  get invoices(): FormArray {
    return this.paymentForm.get('invoices') as FormArray;
  }

}

