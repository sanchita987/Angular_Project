import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent {
  isNavbarShrunk: boolean = false;
  isTextGrown: boolean = true;
  constructor(private router: Router) {}
  testClick() {
    console.log('Test function called');
  }
  toggleNavbar() {
    this.isNavbarShrunk = !this.isNavbarShrunk;
    console.log('isNavbarShrunk:', this.isNavbarShrunk);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['login'])
  }

  
}
