import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http:HttpClient) { }
  dologin(userobject):Observable <any>
  {
    return this.http.post<any>('admin/login',userobject)
  }
  doadminlogin(userobject):Observable <any>
  {
    return this.http.post<any>('admin/adminlogin',userobject)
  }
}
