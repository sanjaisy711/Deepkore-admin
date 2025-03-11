import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpserviceService } from '../admin-shared/http/httpservice.service';
import { Router } from '@angular/router';
import { AuthService } from '../admin-shared/guard/auth.service';
import axios from 'axios';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpserviceService,
    private router: Router,
    private authService: AuthService,
    private axiosService: AxiosService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit(form: FormGroup) {
    console.log(form.value);
    let data = form.value;
    let headers = new HttpHeaders();
    headers = headers.append('skipToken', 'true');
    this.axiosService
      .post(`dzitrauser/signin`, {
        username: data.username,
        password: data.password,
      })
      .then((response: any) => {
        // Use arrow function to preserve 'this' context
        console.log(response);
        if (response) {
          localStorage.setItem('admin-token', response.data.token);
          localStorage.setItem('admin-userid', response.data.id);
          this.authService.setToken(response.data.token);
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      });

    // this.http
    //   .post('https://common.apiv1.dgiverse.com/dzitrauser/signin', data, {
    //     headers,
    //   })
    //   .subscribe((results) => {
    //     if (results) {
    //       localStorage.setItem('admin-token', results.token);
    //       localStorage.setItem('admin-userid', results.id);
    //       this.auth.setToken(results.token);
    //       // if(results.id == '63e1e316a27e926e4c23e34d'){
    //       this.router.navigate(['/admin/dashboard']);
    //       // }else{
    //       //   this.router.navigate(['/'])
    //       // }
    //     }
    //   });
  }
}
