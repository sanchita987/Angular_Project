import { Component } from '@angular/core';
import { DataService } from '../my-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  posts:any[]=[];
  title = 'secondapp';
  constructor(private dataService: DataService) {
    this.dataService.getBookss().subscribe(data => {
      this.posts = data;
    });
  }
}
