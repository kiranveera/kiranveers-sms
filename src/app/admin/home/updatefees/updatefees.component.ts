import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-updatefees',
  templateUrl: './updatefees.component.html',
  styleUrls: ['./updatefees.component.css']
})
export class UpdatefeesComponent implements OnInit {


  constructor(private service:MainService ,private httpclient:HttpClient) { }
  x:any[];
  b2:boolean=false;
  search:any;
objecttomodify2:object;
    ngOnInit() 
    {

      this.service.feesstatus().subscribe(x=>{
        this.x=x['message']
      
      })

    }
    feestatus(x)
    {
      if (x.rollno=="" || x.paidfees=="" || x.totalfees=="" || x.pendingfees=="" )
    {
      alert("fill the all fields with valid information")
    }
    else {
      this.httpclient.post('/admin/fees',x).subscribe((res)=>
      {
        alert(res['message'])
      })
      this.service.feesstatus().subscribe(x=>{
        this.x=x['message']
      
      }) }
    }
   //delete fees
   deletestudent(rollnumber)
  {
    console.log(rollnumber)
    
    this.httpclient.delete(`/admin/deletefees/${rollnumber}`).subscribe((res)=>
    {
      alert(res['message']);
      this.x=res['data']
    })
  
  }
  //update fees

 updatefees(fees)
 {
   this.objecttomodify2=fees;
   console.log(this.objecttomodify2)
   this.b2=true
 }
 onsubmit2(modifyobject)
 {
   this.b2=false
   this.httpclient.put('/admin/updatefees',modifyobject).subscribe((res)=>{
     alert(res['message'])
   })
 }

}
