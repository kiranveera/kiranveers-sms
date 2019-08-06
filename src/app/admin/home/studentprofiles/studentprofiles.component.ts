import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-studentprofiles',
  templateUrl: './studentprofiles.component.html',
  styleUrls: ['./studentprofiles.component.css']
})
export class StudentprofilesComponent implements OnInit {

  constructor(private service:MainService , private http:HttpClient) { }
data:any[]=[]
b4:boolean=false;
objecttomodify4:object;
  ngOnInit() {
    this.service.readdata().subscribe(data=>{
      this.data=data['message']
    })
  }
  // DELETE PROFILE
  deletestudent(studentname)
  {
    console.log(studentname)
    this.http.delete(`/admin/delete/${studentname}`).subscribe(res=>
   {
    alert(res['message']);
    this.data=res['data']

   })
  }

  //update profile
  updateprofile(profile)
{
  this.objecttomodify4=profile;
  console.log(this.objecttomodify4)
  this.b4=true
}
onsubmit4(modifyobject)
{
  this.b4=false
  this.http.put('/admin/updateprofile',modifyobject).subscribe((res)=>{
    alert(res['message'])
  })
}
}
