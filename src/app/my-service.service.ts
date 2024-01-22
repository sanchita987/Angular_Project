import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getBookss() {

    return of([
      {
        title: 'Subjects',
        body: 'Description',
        rating: '3.4'
      },
      {
        title: 'The power of subconscious Mind',
        body: 'Self help book',
        rating: '7.2'
      },
      {
        title: 'The power of conscious Mind',
        body: 'Self help book',
        rating: '7.2'
      },
      {
        title: 'The power of unconscious Mind',
        body: 'Self help book',
        rating: '9.3'
      }

    ])
    
  }

  getPosts() {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getPost(id: number) {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts/'+id);
  }

  getArtists() {
    let artists = [
      {
        name: 'selena Gomez',
        age:'30',
        photo: 'https://th.bing.com/th/id/OIP._Y51L-h4pZUGNBrjab17RQHaEo?w=195&h=122&c=7&r=0&o=5&dpr=1.5&pid=1.7'
      },
      {
        name: 'Tyalor swift',
        age:'32',
        photo: 'https://th.bing.com/th/id/OIP.GD40xiKUANevdsLOmWMicwHaE8?rs=1&pid=ImgDetMain'
      }
    ];
    return of(artists);
  }
}

