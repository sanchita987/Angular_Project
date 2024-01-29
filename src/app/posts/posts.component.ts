import { Component } from '@angular/core';
import { DataService } from '../my-service.service';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, SharedModuleModule, RouterModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  posts:any;

  constructor(private data: DataService) {
    this.data.getPosts().subscribe(data=>{
      this.posts = data;
    })
  

}
}

