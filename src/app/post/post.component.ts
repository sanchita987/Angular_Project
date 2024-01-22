import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../my-service.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterModule],
  templateUrl:'./post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{
  post:any;
  constructor(private route: ActivatedRoute, private dataService: DataService){

  }

  ngOnInit(){
    this.route.params.subscribe(data=>{
      this.dataService.getPost(data['id']).subscribe(response=>{
        this.post = response
      })
    })
  }
}
