import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService  implements HttpInterceptor{

  constructor() { }
  intercept(req:HttpRequest<any>,next:HttpHandler):
      Observable<HttpEvent<any>>
      {
        //read token from local storage
        const idToken=localStorage.getItem("idtoken")
        //if token is found ,it adds it header of request object
        if(idToken)
        {
          
          const cloned=req.clone({
            headers:req.headers.set("Authorization","Bearer "+idToken)
          })
          //and then forward the request object cloned with token
          return next.handle(cloned)
        }
        else
        {
          //if token is not found forward yhe same req.object
          return next.handle(req)
        }
      }
}









    