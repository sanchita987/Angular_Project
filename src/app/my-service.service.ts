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
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        rating: '4.3',
      },
      {
        title: '1984',
        author: 'George Orwell',
        rating: '4.5',
      },
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        rating: '4.2',
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        rating: '4.4',
      },
      {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        rating: '4.0',
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        rating: '4.2',
      },
      {
        title: 'To the Lighthouse',
        author: 'Virginia Woolf',
        rating: '4.1',
      },
      {
        title: 'The Da Vinci Code',
        author: 'Dan Brown',
        rating: '3.8',
      },
      {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        rating: '4.2',
      },
      {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        rating: '4.6',
      },
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

