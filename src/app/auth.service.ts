import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken() {
    if(localStorage.getItem('access_token')) {
      return true;
    }
    return false;
  }
}
