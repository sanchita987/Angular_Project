import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessTokenInterface, HttpHeadersInterface } from './http-interfaces';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://nitvcrmapi.truestreamz.com/api/v1/customer';
  private registerUrl = 'https://nitvcrmapi.truestreamz.com/api/v1/customer/register';


  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeadersInterface {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    return headers;
  }
  getCustomers(page: number, sortBy: string, sortOrder: string, search: string, filter: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('sort_by', sortBy)
      .set('search', search)
      .set('sort_order', 'desc')
      .set('filter', filter);

    return this.http.get<any>(this.apiUrl, { params: params, headers: this.getHeaders() })
      .pipe(
        map((data: any) => {
          data['data']['items'].forEach((element: any) => {
            element.text = element.is_active ? 'Active' : 'Inactive';
          });
          return data;
        })
      );
  }
  getPostalCodeData(code: string): Observable<any> {
    return this.http.get<any>('https://nitvcrmapi.truestreamz.com/api/v1/postal_codes/' + code, { headers: this.getHeaders() });
  }


  getCusto(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() });
  }

  getProvinceData(): Observable<any> {
    return this.http.get<any>('https://nitvcrmapi.truestreamz.com/api/v1/postal_codes/list-view/prefecture', { headers: this.getHeaders() });
  }

  getCityList(prefecture: string): Observable<any> {
    console.log(prefecture, "p")
    return this.http.get<any>('https://nitvcrmapi.truestreamz.com/api/v1/postal_codes/city-list/' + prefecture, { headers: this.getHeaders() });
  }
  getAddressList(city: string): Observable<any> {
    return this.http.get<any>('https://nitvcrmapi.truestreamz.com/api/v1/postal_codes/town-list/' + city, { headers: this.getHeaders() });
  }

  getCustomer(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  getContact(c_id: number, formData: any): Observable<any> {
    const url = `${this.apiUrl}/${c_id}/contacts`;
    return this.http.post<any>(url, formData, { headers: this.getHeaders() });
  }


  deleteContact(customer_id: number, contact_id: number): Observable<any> {
    const url = `${this.apiUrl}/${customer_id}/contacts/${contact_id}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  register(data: any, frontFile: File, backFile: File) {
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('email', data.email);
    formData.append('postal_code', data.postal_code);
    formData.append('province', data.province);
    formData.append('city', data.city);
    formData.append('address', data.address);
    formData.append('customer_type', data.customer_type);
    formData.append('residence_card_front', frontFile);
    formData.append('residence_card_back', backFile);

    return this.http.post(this.registerUrl, formData, { headers: this.getHeaders() });
  }

  updateCustomer(id: number, updatedData: any, frontFile?: File, backFile?: File): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    const formData = new FormData();
    updatedData.id = id;
    formData.append('id', id.toString());
    formData.append('first_name', updatedData.first_name);
    formData.append('customer_number',updatedData.customer_number );
    formData.append('last_name', updatedData.last_name);
    formData.append('email', updatedData.email);
    formData.append('customer_type', updatedData.customer_type );
    if (frontFile) {
      formData.append('residence_card_front', frontFile);
    }
    if (backFile) {
      formData.append('residence_card_back', backFile);
    }
    formData.append('postal_code', updatedData.postal_code);
    formData.append('province', updatedData.province);
    formData.append('city', updatedData.city);
    formData.append('address', updatedData.address);
    return this.http.put<any>(url, formData, { headers: this.getHeaders() });
  }



}
