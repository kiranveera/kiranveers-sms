import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service:MainService) { }
user:any[]=[];
  ngOnInit() {

  //   this.user=this.service.sendLoggedUser()[0].studentname
  //   this.service.viewSpecificProfile(this.user).subscribe( profile=>{
  //     // this.profile= profile['message']
  //   console.log(this.user)

    
  // })

  // }
}}
