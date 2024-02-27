import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TaxService } from '../tax.service';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-tax',
  standalone: true,
  imports: [CommonModule,RouterModule, ReactiveFormsModule],
  templateUrl: './create-tax.component.html',
  styleUrl: './create-tax.component.css'
})
export class CreateTaxComponent {
  taxForm: FormGroup;
  constructor(private fb: FormBuilder,private taxService: TaxService, private route: Router,) {
    this.taxForm = this.fb.group({
      name: ['', Validators.required],
      rate: ['', [Validators.required, Validators.pattern(/^-?\d*(\.\d+)?$/)]],
      description: ['', Validators.required]
    });
  }
  ontaxRegister(): void {
    const taxData = this.taxForm.value;
    this.taxService.registertax(taxData)
      .subscribe({
        next: (response: any) => {
          console.log('Tax Register successful:', response);
          this.route.navigate(['admin/tax']);
        },
        error: (error: any) => {
          console.error('Error occurred during Tax registration:', error);
        }
      });
  }

  get name() {
    return this.taxForm.get('name');
  }
  get rate() {
    return this.taxForm.get('rate');
  }
  get description() {
    return this.taxForm.get('description');
  }
}
