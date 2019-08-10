import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  profile:any[]=[]
  user
  constructor(private service:MainService) { }

  ngOnInit() {

    this.user=this.service.sendLoggedUser()
    this.service.viewSpecificProfile(this.user).subscribe( profile=>{
      this. profile= profile['message']
      
    })
  }

}
