import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubscriptionService } from '../subscription.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent {
  subscription : any = {
    data: { items: [] }
  };
constructor(private data: SubscriptionService , private subscriptionService : SubscriptionService ) {
  this.getsubscription();
}
getsubscription() {
  this.data.getsubscription(this.search, this.filter)
    .subscribe(
      (response: any) => {
        console.log(response, "response")
        if (response && response.data && response.data.items) {
          this.subscription.data.items = response.data.items;
        } else {
          console.error('Subscription data is missing or in unexpected format.');
        }
      },
      (error) => {
        if (error.status === 404) {
          console.error('Subscription not found. Redirect or show a message.');
        } else {
          console.error('An error occurred:', error);
        }
      }
    );
}
search = ''
  searchData(e: any) {
    console.log(e.target.value)
    this.search = e.target.value;
    this.getsubscription()
  }
  filter = 'live'
  filterData(e: any) {
    console.log(e.target.value)
    this.filter = e.target.value;
    this.getsubscription()
  }
}


