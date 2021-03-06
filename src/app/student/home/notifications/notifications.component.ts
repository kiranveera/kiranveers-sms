import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private service: MainService) { }
  notifications: any[] = []
  ngOnInit() {
    this.service.notifications().subscribe(notifications => {
      if (notifications['message']=='unauthorized access')
      {
        alert(['unauthorized access'])
      }
      this.notifications = notifications['message']
     
    })
  }

}