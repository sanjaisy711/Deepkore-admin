import {  HttpRequest,  HttpHandler,  HttpEvent,  HttpInterceptor, HttpErrorResponse } from '@angular/common/http';  
import { BehaviorSubject, Observable , throwError} from 'rxjs';
import { Injectable, Injector } from "@angular/core";
import { switchMap, finalize, tap, catchError, filter, take } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorsadminService implements HttpInterceptor {

  authToken: any;
  id: any;
  redirect: any = 0;
  constructor(private inject: Injector, private router: Router, ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let token;
    
    this.authToken = localStorage.getItem('admin-token');
    this.id = localStorage.getItem('admin-userid');
    if (request.headers.get('skipToken')) {
      return next.handle(request);
    }
    request = request.clone({
    setHeaders: {
      Authorization: this.authToken,
      userid: this.id
    }
    });
    return next.handle(request).pipe(tap(() => { }, (err: any) => {
      if(err instanceof HttpErrorResponse) {
        if ((err.status !== 401) && (err.status !== 502)) {
          return;
        }
        else {
          setTimeout(() => {
            // console.log(err,"401");
            // this.auth.signOut();
            this.router.navigate(['/sign-in']);

          }, 2000);
          this.redirect =1;
        }
      }
      
    }));
    
  }
}
