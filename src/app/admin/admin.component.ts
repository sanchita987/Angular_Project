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
  isNavbarCollapsed: boolean = false;
  isTextGrown: boolean = true;
  isDropdownOpen: boolean = false;
  constructor(private router: Router) {}
 
  testClick() {
    console.log('Test function called');
  }
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    console.log('Navbar collapsed state:', this.isNavbarCollapsed);
  }
  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['login'])
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log('isDropdownOpen:', this.isDropdownOpen);
  }
  
}
