import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ RouterModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  user : any = {
    data:[]
  };
constructor(private data: UserService, private userService: UserService) {
  this.data.getuser()
    .subscribe(
      (response: any) => {
        console.log(response, "response")
        this.user = response['data'];
      },
      (error) => {
        if (error.status === 404) {
          console.error('User not found. Redirect or show a message.');
        } else {
          console.error('An error occurred:', error);
        }
      }
    );
}
}