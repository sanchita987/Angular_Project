import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../customer.service';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: any = {
    items: []
  };
  currentPage: number = 1;
  totalPages: number = 50;
  updatedData: any;
  customer_registerForm: any;

  constructor(private data: CustomerService, private router: Router) { }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.data.getCustomers(this.currentPage).subscribe((response: any) => {
      console.log(response, 'response');
      this.customers = response.data;
      this.totalPages = response.total_pages;
      this.totalPages = Math.min(response.total_pages, 10);
    });
  }

  loadNextPage() {
    this.currentPage++;
    this.loadCustomers();
    // }
  }

  loadPreviousPage() {
    if (this.currentPage == 1) {
      alert("No prevoius page found");
      return;
    }
    this.currentPage--;
    this.loadCustomers();
    // }
  }

    
    
  }
