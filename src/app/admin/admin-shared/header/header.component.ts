import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../guard/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  isCross: boolean = false
  constructor(private auth: AuthService, private _Router: Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.auth.signOut();
    this._Router.navigate(['/sign-in']);
  }
  addClass(event: any){
    let classlist = document.getElementsByTagName('li');
    for (let index = 0; index < classlist.length; index++) {
      const element = classlist[index];
      element.classList.remove('activeli');
    }
    event.target.classList.add('activeli');
    this.isCross = false;
  }
}
