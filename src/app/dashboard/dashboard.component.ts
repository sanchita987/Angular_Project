import { Component } from '@angular/core';
import { DashboardServiceService } from '../dashboard-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  posts:any;
  subs:any;
  stat:any;
  sign:any;
  constructor(private data: DashboardServiceService) {
    this.data.getPosts().subscribe((response: any)=>{
      console.log(response, "response")
      this.posts = response['data'];
    })
    
    this.data.getsubs().subscribe((response: any)=>{
      console.log(response, "response")
      this.subs = response['data'];
    })
    
    this.data.getsign().subscribe((response: any)=>{
      console.log(response, "response")
      this.sign= response['data'];
      
    })
    this.data.getstat().subscribe((response: any)=>{
      console.log(response, "response")
      this.stat= response['data'];
    })
  }
}
