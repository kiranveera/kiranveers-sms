import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-viewmarks',
  templateUrl: './viewmarks.component.html',
  styleUrls: ['./viewmarks.component.css']
})
export class ViewmarksComponent implements OnInit {

  constructor(private service:MainService) { }
  marks:any[]=[]
  user;
  ngOnInit()
   {
     this.user=this.service.sendLoggedUser()
    this.service.viewSpecificMarks(this.user).subscribe(marks=>{
      this.marks=marks['message']
      //console.log(this.marks)
    })
   }
}

