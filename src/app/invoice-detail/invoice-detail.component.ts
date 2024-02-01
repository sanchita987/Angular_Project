import { Component } from '@angular/core';
import { InvoiceServiceService } from '../invoice-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class InvoiceDetailComponent {
  invoice: any = {
    data: []
  };
  constructor(private data: InvoiceServiceService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.data.getInvoices(data['id']).subscribe((response: any) => {
        console.log(response, "response")
        this.invoice= response['data'];
      })
    })
  }

}


