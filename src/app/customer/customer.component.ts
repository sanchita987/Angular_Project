import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../customer.service';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

type Customer = {
  [key: string]: any;
  created_at: string;
};

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
  sortColumn = 'created_at';
  reverseSort = false;
  currentPage: number = 1;
  totalPages: number = 50;
  updatedData: any;
  customer_registerForm: any;

  truncateText(text: string, maxLength: number = 20): string {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  constructor(private data: CustomerService, private router: Router) { }

  ngOnInit() {
    this.loadCustomers();
  }
  search = ''
  searchData(e: any) {
    console.log(e.target.value)
    this.search = e.target.value;
    this.loadCustomers()
  }
  filter = 'all'
  filterData(e: any) {
    console.log(e.target.value)
    this.filter = e.target.value;
    this.loadCustomers()
  }
  loadCustomers() {
    this.data.getCustomers(this.currentPage, this.sortColumn, this.reverseSort ? 'desc' : 'asc', this.search, this.filter)
      .subscribe((response: any) => {
        console.log(response, 'response');
        this.customers = response.data;
        this.totalPages = response.total_pages;
        this.totalPages = Math.min(response.total_pages, 10);
      });
  }

  toggleSortOrder(column: string): void {
    if (this.sortColumn === column) {
      this.reverseSort = !this.reverseSort;
    } else {
      this.sortColumn = column;
      this.reverseSort = false;
    }
    this.customers.items.sort((a: any, b: any) => {
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.reverseSort ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
      } else {
        return this.reverseSort ? valueB - valueA : valueA - valueB;
      }
    });
  }



  loadNextPage() {
    this.currentPage++;
    this.loadCustomers();
  }

  loadPreviousPage() {
    if (this.currentPage === 1) {
      alert("No previous page found");
      return;
    }
    this.currentPage--;
    this.loadCustomers();
  }

  getPageNumbers(): number[] {
    const totalPagesArray = [];
    for (let i = 1; i <= 5; i++) {
      totalPagesArray.push(i);
    }
    return totalPagesArray;
  }

  loadPage(page: number) {
    this.currentPage = page;
    this.loadCustomers();
  }
}
