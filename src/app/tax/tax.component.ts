import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { TaxService } from '../tax.service';

@Component({
  selector: 'app-tax',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './tax.component.html',
  styleUrl: './tax.component.css'
})
export class TaxComponent {
  tax : any = {
    data: { items: [] }
  };
  constructor(private data: TaxService) {
    this.data.gettax()
      .subscribe({
        next: (response: any) => {
          console.log(response, "response")
          if (response && response.data && response.data.items) {
            this.tax.data.items = response.data.items;
          } else {
            console.error('Tax data is missing or in unexpected format.');
          }
        },
        error: (error) => {
          if (error.status === 404) {
            console.error('Tax not found. Redirect or show a message.');
          } else {
            console.error('An error occurred:', error);
          }
        }
      });
  }
  


}







