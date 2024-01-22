import { Component } from '@angular/core';
import { DataService } from '../my-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})
export class ArtistsComponent {
  title = 'secondapp';
  posts:any;
  constructor(private data: DataService) {
    this.data.getArtists().subscribe(data=>{
      this.posts = data;
    })
  }
}
