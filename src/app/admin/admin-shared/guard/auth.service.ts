import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Token = new BehaviorSubject<string>('');
  public Token$ = this.Token.asObservable();
  @Output() IsLoginStatuschange: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) { 

  }
  setToken(tokendata: string){  
    // console.log(tokendata);   
    if((tokendata)) {
      localStorage.setItem('admin-token',tokendata);
      this.Token.next(tokendata);
    }
    // this.emitTokentoApp();
  }
  emitTokentoApp(){
    return this.Token;
  }
  getToken(){  
    return this.Token;
  }
  getAuthToken() {
    const user = localStorage.getItem("admin-token");
    if (user !== null) {
      return user;
    } else {
      localStorage.removeItem("admin-token");
      return null;
    }
  }
  isAuthenticated(){
    const isLoggedIn = localStorage.getItem('admin-token');   
    return isLoggedIn !== null ? true : false;
  }

  public userLogin(url: string,loginData : any ){
    let headers = new HttpHeaders();
    url = environment.BaseURL+url;
    headers = headers.append('skipToken', 'true');
    return this.http.post<any>(url, loginData, {headers}).toPromise();
    // return this.http.post<ApiResponse<{jwt: string}>>(url, {racfId}, {headers}).toPromise();

  }
  signOut(){
    localStorage.removeItem('admin-userid');
    localStorage.removeItem('admin-token');
    this.setToken('');
  }

}
