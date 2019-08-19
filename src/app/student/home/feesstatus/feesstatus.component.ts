import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-feesstatus',
  templateUrl: './feesstatus.component.html',
  styleUrls: ['./feesstatus.component.css']
})
export class FeesstatusComponent implements OnInit {

  constructor(private service: MainService) { }
  fee: any[] = []
  user
  ngOnInit() {
    this.user = this.service.sendLoggedUser()
    this.service.viewSpecificFees(this.user).subscribe(fee => {
      if (fee['message']=='unauthorized access')
      {
        alert(['unauthorized access'])
      }
      this.fee = fee['message']
     
    })
  }

}
