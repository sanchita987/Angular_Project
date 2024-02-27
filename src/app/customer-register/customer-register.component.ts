import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-customer-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, MatAutocompleteModule, MatInputModule, MatOptionModule],
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css'],
})
export class CustomerRegisterComponent implements OnInit {
  selectedFrontFile: File | null = null;
  selectedBackFile: File | null = null;
  frontPreview: string | ArrayBuffer | null = null;
  backPreview: string | ArrayBuffer | null = null;
  customer_registerForm!: FormGroup;
  myForm!: FormGroup;
  customer_registerResponse: any = null;
  errorResponse: any = '';
  section: any = 'profile';
  activeSection: string = 'profile';
  provinces: string[] = [];
  cities: string[] = [];
  addresses: string[] = [];
  filteredProvinces: string[] = [];
  filteredCities: string[] = [];
  filteredAddresses: string[] = [];
  

  constructor(
    private customerservice: CustomerService,
    private route: Router,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.activeSection = '';
    this.customer_registerForm = this.fb.group({
      contacts: this.fb.array([]),
      customer_type: [null, [Validators.required]],
      id: [''],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required]],
      last_name: ['',],
      mailing_address: [''],
      deposit: [''],
      zipcode: [''],
      phone: [''],
      details: [''],
      province: [''],
      city: [''],
      address: [''],
      building: [''],
      gender: [''],
      dob: [''],
      company: [''],
      whatsapp: [''],
      facebook: [''],
      profession: [''],
      date: [''],
      nationality: [''],
      residence_card_number: [''],
      residence_card_status: [''],
      smartpit_no: [''],
      bankautoid_telecom: [''],
      bankauto_veritrans: [''],
      referer: [''],
      contact: [''],
      description: [''],
      period_of_stay: [''],
      residence_card_front: [''],
      residence_card_back: [''],
      company_doc: [''],
      postal_code: [''],
      line: [''],
      stateCtrl: [''],
    });
    this.myForm = this.fb.group({
      myVar: ['']
    })
    this.getProvinceData();
    this.filteredProvinces = this.provinces;
  }

  getProvinceData(): void {
    this.customerservice.getProvinceData().subscribe(
      (response: any) => {
        this.provinces = response.data;
        this.filteredProvinces = [...this.provinces];
      }
    );
  }
  filterProvinces(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredProvinces = this.provinces.filter(province =>
      province.toLowerCase().includes(inputValue)
    );
  }
  
  selectProvince(event: MatAutocompleteSelectedEvent): void {
    const selectedProvince = event.option.value;
    console.log(selectedProvince);
    this.customerservice.getCityList(selectedProvince).subscribe({
      next: (response: any) => {
        this.cities = response.data;
        this.filteredCities = [...this.cities];
        console.log(response.data);
      }
    });
  }
  
  
  selectCity(event: MatAutocompleteSelectedEvent): void {
    const selectedCity = event.option.value;
    console.log(selectedCity);
    this.customerservice.getAddressList(selectedCity).subscribe({
      next: (response: any) => {
        this.addresses = response.data;
        this.filteredAddresses = [...this.addresses];
        console.log(response.data);
      }
    });
  }
  

  filterCities(event: any): void {
    const value = (event.target as HTMLInputElement).value;
    console.log('Input value:', value); 
    this.filteredCities = this.cities.filter(city =>
        city.toLowerCase().includes(value.trim().toLowerCase())
    );
}
filterAddresses(event: Event): void {
  const inputValue = (event.target as HTMLInputElement).value.toLowerCase().trim();
  // Filter the addresses based on the input value
  this.filteredAddresses = this.addresses.filter(address =>
    address.toLowerCase().includes(inputValue)
  );
}




 onPostalCodeChange() {
    const postalCode = this.customer_registerForm.get('postal_code')?.value;
    if (postalCode) {
      this.customerservice.getPostalCodeData(postalCode).subscribe({
        next: (response) => {
          console.log(response.data)
          this.customer_registerForm.patchValue({
            city: response.data.city_en,
            province: response.data.pref_en,
            address: response.data.town_en
          });
        }
      }
      );
    }
  }

  onregister(): void {
    console.log(this.customer_registerForm.value);
    if (!this.customer_registerForm.valid) {
      return;
    }

    if (this.selectedFrontFile && this.selectedBackFile) {
      this.customerservice.register(
        this.customer_registerForm.value,
        this.selectedFrontFile,
        this.selectedBackFile
      ).subscribe({
        next: (response) => {
          this.customer_registerResponse = response;
          console.log('Customer Register successful:', response);
          this.route.navigate(['admin/customer']);
        },
        error: (error) => {
          this.errorResponse = 'Error';
        }
      });
    } else {
      console.error('Front and back files are required.');
    }

    if (this.selectedFrontFile && this.selectedBackFile) {
      this.customerservice.register(
        this.customer_registerForm.value,
        this.selectedFrontFile,
        this.selectedBackFile
      ).subscribe({
        next: (response) => {
          this.customer_registerResponse = response;
          console.log('Customer Register successful:', response);
          this.route.navigate(['admin/customer']);
        },
        error: (error) => {
          this.errorResponse = 'Error';
        }
      });
    }
  }

  onFileSelected(event: any, inputType: string) {
    const file = event.target.files[0];
    if (file) {
      if (inputType === 'front') {
        this.selectedFrontFile = file;
        this.showPreview(file, 'front');
      } else if (inputType === 'back') {
        this.selectedBackFile = file;
        this.showPreview(file, 'back');
      }
    }
  }
  showPreview(file: File, inputType: string) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      if (inputType === 'front') {
        this.frontPreview = e.target.result;
      } else if (inputType === 'back') {
        this.backPreview = e.target.result;
      }
    };

    reader.readAsDataURL(file);
  }
  discardFrontPhoto() {
    this.frontPreview = null;
    this.selectedFrontFile = null;
    const residenceCardFrontControl = this.customer_registerForm.get('residence_card_front');
    if (residenceCardFrontControl) {
      residenceCardFrontControl.setValue(null);
    }
  }
  discardBackPhoto() {
    this.backPreview = null;
    this.selectedBackFile = null;
    const residenceCardBackControl = this.customer_registerForm.get('residence_card_back');
    if (residenceCardBackControl) {
      residenceCardBackControl.setValue(null);
    }
  }
  

  get id() {
    return this.customer_registerForm.get('id');
  }

  get email() {
    return this.customer_registerForm.get('email');
  }

  get first_name() {
    return this.customer_registerForm.get('first_name');
  }

  get last_name() {
   
    return this.customer_registerForm.get('last_name');
  }

  get customer_type() {
    return this.customer_registerForm.get('customer_type');
  }

  get mailing_address() {
    return this.customer_registerForm.get('mailing_address');
  }

  get deposit() {
    return this.customer_registerForm.get('deposit');
  }

  get zipcode() {
    return this.customer_registerForm.get('zipcode');
  }

  get details() {
    return this.customer_registerForm.get('details');
  }

  get phone() {
    return this.customer_registerForm.get('phone');
  }

  get province() {
    return this.customer_registerForm.get('province');
  }

  get city() {
    return this.customer_registerForm.get('city');
  }

  get address() {
    return this.customer_registerForm.get('address');
  }

  get building() {
    return this.customer_registerForm.get('building');
  }

  get gender() {
    return this.customer_registerForm.get('gender');
  }

  get dob() {
    return this.customer_registerForm.get('dob');
  }

  get company() {
    return this.customer_registerForm.get('company');
  }
  get whatsapp() {
    return this.customer_registerForm.get('whatsapp');
  }
  get facebook() {
    return this.customer_registerForm.get('facebook');
  }
  get profession() {
    return this.customer_registerForm.get('profession');
  }
  get date() {
    return this.customer_registerForm.get('date');
  }
  get nationality() {
    return this.customer_registerForm.get('nationality');
  }
  get residence_card_number() {
    return this.customer_registerForm.get('residence_card_number');
  }
  get residence_card_status() {
    return this.customer_registerForm.get('residence_card_status');
  }
  get company_doc() {
    return this.customer_registerForm.get('company_doc');
  }
  get smartpit_no() {
    return this.customer_registerForm.get('smartpit_no');
  }
  get bankautoid_telecom() {
    return this.customer_registerForm.get('bankautoid_telecom');
  }
  get bankauto_veritrans() {
    return this.customer_registerForm.get('bankauto_veritrans');
  }
  get referer() {
    return this.customer_registerForm.get('referer');
  }
  get contacts() {
    return this.customer_registerForm.get('contacts');
  }
  get description() {
    return this.customer_registerForm.get('description');
  }
  get period_of_stay() {
    return this.customer_registerForm.get('period_of_stay');
  }

  switchSection(section: string): void {
    this.activeSection = section;
    // alert()
    this.section = section;
  }
  addInputField(): void {
    const contacts = this.customer_registerForm.get('contacts') as FormArray;
    contacts.push(this.createContactFormGroup()); // Add a new FormGroup for contact
  }

  createContactFormGroup(): FormGroup {
    return this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      mobile: ['']
    });
  }

  removeInputField(index: number): void {
    const contacts = this.customer_registerForm.get('contacts') as FormArray;
    contacts.removeAt(index);
  }

  get inputFields() {
    return (this.customer_registerForm.get('contacts') as FormArray).controls;
  }

}



