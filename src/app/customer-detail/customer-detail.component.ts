import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent {
  customer: any = {
    data: []
  };

  constructor(private data: CustomerService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.data.getCustomer(data['id']).subscribe((response: any) => {
        console.log(response, "response")
        this.customer = response['data'];
      })
    })
  }
}

