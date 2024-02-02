import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { InvoiceServiceService } from '../invoice-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

declare const $: any;
@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent {
  customer: any = {
    data: []
  };
  invoices: any;
  contacts: any;
  cid: any;
  contact_id: any;
  contactForm: any;
  contactResponse: any;
  errorResponse: any;


  constructor(private customerService: CustomerService,
    private route: ActivatedRoute, private router: Router,
    private inoviceService: InvoiceServiceService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      phone: ['',],
      title: ['',],
      mobile: ['',],
      last_name: ['',]
    })

  }

  save() {
    if (this.contact_id) {
      this.updateContact();
      return;
    }
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.customerService.getContact(this.cid, formData).subscribe(
        response => {

          console.log('Contact saved:', response);
          this.customerService.getCustomer(this.cid).subscribe((response: any) => {
            this.customer = response['data'];
          })
          $('#exampleModalLong').modal('hide');
        },
        error => {
          console.error('Error saving contact:', error);
        }
      );
    }
  }

  update(contact: any): void {
    this.contact_id = contact.id
    this.contactForm.patchValue(contact);
    $('#exampleModalLong').modal('show');
  }


  updateContact(): void {

    this.customerService.updateContact(this.cid, this.contact_id, this.contactForm.value).subscribe(
      (response) => {
        console.log('Contact updated successfully', response);
        this.contactResponse = response;
        this.contact_id = null;
        $('#exampleModalLong').modal('hide');
      },
      (error) => {
        console.error('Error updating contact', error);
        this.errorResponse = 'Error';
      }
    );
  }

  delete(contact: any) {
    let c = confirm('do you want to sure delete ?')
    if (!c) {
      return;
    }
    this.customerService.deleteContact(this.cid, contact.id).subscribe(
      (response) => {
        console.log('Contact deleted successfully', response);
        this.contactResponse = response;
        this.contact_id = null;
        $('#exampleModalLong').modal('hide');
      },
      (error) => {
        console.error('Error updating contact', error);
        this.errorResponse = 'Error';
      }
    );
  }
  ngOnInit() {
    this.route.params.subscribe(data => {
      this.cid = data['id']
      this.inoviceService.getInvoice({ customer_id: this.cid }).subscribe((res: any) => {
        this.invoices = res['data']
        console.log(res['data'])
      });

      this.customerService.getCustomer(data['id']).subscribe((response: any) => {
        this.customer = response['data'];
      });

    })
  }
  get email() {
    return this.contactForm.get('email');
  }
  get first_name() {
    return this.contactForm.get('first_name');
  }
  get last_name() {
    return this.contactForm.get('last_name');
  }
  get title() {
    return this.contactForm.get('title');
  }
  get phone() {
    return this.contactForm.get('phone');
  }
  get mobile() {
    return this.contactForm.get('mobile');
  }

}

