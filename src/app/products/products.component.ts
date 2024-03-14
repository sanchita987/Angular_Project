import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

declare const $: any;
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  product: any = {
    data: { items: [] }
  };
  product_id: any;
  productForm: any;
  productResponse: any = null;
  errorResponse: any = '';

  constructor(private data: ProductService, private productService: ProductService,
    private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder
  ) {

    this.productForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      status: ['true', [Validators.required]],
      description: ['',],
    });
    this.loadPorudcts()
  }
  filter = 'all'
  filterData(e: any) {
    console.log(e.target.value)
    this.filter = e.target.value;
    this.loadPorudcts()
  }

  search = ''
  searchData(e: any) {
    console.log(e.target.value)
    this.search = e.target.value;
    this.loadPorudcts()
  }

  loadPorudcts() {
    this.data.getProduct(this.filter, this.search)
      .subscribe({
        next: (response: any) => {
          console.log(response, "response")
          if (response && response.data && response.data.items) {
            this.product.data.items = response.data.items;
          } else {
            console.error('Product data is missing or in unexpected format.');
          }
        },
        error: (error) => {
          if (error.status === 404) {
            console.error('Product not found. Redirect or show a message.');
          } else {
            console.error('An error occurred:', error);
          }
        }
      });
  }


  openModal(product: any) {
    this.product_id = ''
    this.productForm.reset()
    this.productForm.patchValue({ status: 1 })
    $('#exampleModalLong').modal('show');
  }

  closeModal() {
    $('#exampleModalLong').modal('hide');
  }


  showModal(product: any): void {
    console.log('Product Data:', product);
    this.product_id = product.id
    this.productForm.patchValue(product);
    $('#exampleModalLong').modal('show');
  }


  updateProduct(): void {
    if (!this.product_id) {
      this.addProduct();
      return;
    }
    if (!this.productForm.valid) {
      return;
    }
    this.productService.updateProduct(this.product_id, this.productForm.value).subscribe({
      next: (value) => {
        $('#exampleModalLong').modal('hide');
        this.loadPorudcts()
      },
      error: (error) => {

      },
      complete: () => {

      }
    }
    );
  }

  addProduct(): void {
    if (!this.productForm.valid) {
      return;
    }
    this.productService.saveProduct(this.productForm.value).subscribe({
      next: (value) => {
        $('#exampleModalLong').modal('hide');
        this.loadPorudcts()
      },
      error: (error) => {

      },
      complete: () => {

      }
    }
    );
  }


  get code() {
    return this.productForm.get('code');
  }
  get name() {
    return this.productForm.get('name');
  }
  get status() {
    return this.productForm.get('status');
  }
  get description() {
    return this.productForm.get('description');
  }

}
