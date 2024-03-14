import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InvoiceServiceService } from '../invoice-service.service';
@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {
  invoice : any = {
    data:[]
  };
  constructor(private data: InvoiceServiceService,) {
    this.data.getInvoice({}).subscribe((response: any)=>{
      console.log(response, "response")
      this.invoice = response['data'];
    })
}
}
