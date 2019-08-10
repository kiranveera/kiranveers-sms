import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-attendencestatus',
  templateUrl: './attendencestatus.component.html',
  styleUrls: ['./attendencestatus.component.css']
})
export class AttendencestatusComponent implements OnInit {

  constructor(private service: MainService) { }
  att: any[] = []
  user;

  ngOnInit() {
    this.user = this.service.sendLoggedUser()
    this.service.viewSpecificAttendance(this.user).subscribe(att => {
      this.att = att['message']
     
    })
  }

}
