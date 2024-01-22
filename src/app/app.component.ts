import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { DataService } from './my-service.service';
import { BooksComponent } from './books/books.component';
import { ArtistsComponent } from './artists/artists.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PostsComponent,LoginComponent, BooksComponent,ArtistsComponent,ContactComponent, RouterModule,FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  posts:any[]=[];
  title = 'secondapp';
  constructor(private dataService: DataService) {
    this.dataService.getBookss().subscribe(data => {
      this.posts = data;
    });
    
  }
  
}

