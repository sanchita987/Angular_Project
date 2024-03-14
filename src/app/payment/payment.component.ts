import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaymentService } from '../payment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})

export class PaymentComponent {
  payment : any = {
    data: { items: [] }
  };
  constructor(private data: PaymentService) {
    const handleResponse = (response: any) => {
      console.log(response, "response");
      if (response && response.data && response.data.items) {
        this.payment.data.items = response.data.items;
      } else {
        console.error('Payment data is missing or in unexpected format.');
      }
    };
  
    const handleError = (error: any) => {
      if (error.status === 404) {
        console.error('Payment not found. Redirect or show a message.');
      } else {
        console.error('An error occurred:', error);
      }
    };
  
    this.data.getpayment().subscribe({
      next: handleResponse,
      error: handleError
    });
  }
  

}



