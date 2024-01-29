import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  customers : any = {
    data:[]
  };
  constructor(private data: CustomerService) {
    this.data.getcustomers().subscribe((response: any)=>{
      console.log(response, "response")
      this.customers = response['data'];
    })

}
}